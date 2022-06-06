import { Request, Response } from 'express';
import { NEVER, Observable } from 'rxjs';
import * as _ from "lodash";
import '../../../common/env';

export type DataProducer = () => Promise<unknown>;
export type DataFilter = (data: unknown) => unknown;

export class SSEController {

    private KEEP_CONNECTION_ALIVE_FOR; 
    private static totalSubscriptions = 0;

    constructor() {
        const sseTimeout = process.env.SSE_CONNECTION_KEEPALIVE_TIMEOUT ?? "86400"; // secondi = 24 ore
        this.KEEP_CONNECTION_ALIVE_FOR = parseInt(sseTimeout);
    }

    public event(
        req: Request,
        res: Response,
        dataProducer: DataProducer,
        filter?: DataFilter
    ): void {
        // il client può inviare, per esempio, ?subscribe=600 per ottenere
        // le notifiche di cambiamenti per i prossimi 10 minuti (600 secondi).
        // In ogni caso pongo un limite di KEEP_CONNECTION_ALIVE_FOR a questo
        // timeout. Oltre tale limite il client dovrà comunque rifare la connessione
        // per ottenere di nuovo le notifiche. A rifare la connessione ci pensa
        // EventSource lato client, qui dobbiamo solo pensare a chiuderla quando
        // scade il timeout.
        const qsubscribe = req.query.subscribe?.toString() ?? '-1';
        const qtimeout = parseInt(qsubscribe);
        const timeout = qtimeout > 0 ? Math.min(qtimeout, this.KEEP_CONNECTION_ALIVE_FOR) : 0;
        const subscribe = timeout > 0;
        if (subscribe) {
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                Connection: 'keep-alive',
            });
            res.flushHeaders();

            // Tell the client to retry every 5 seconds if connectivity is lost
            res.write('retry: 5000\n\n');
        }

        // chiamare dataProducer() corrisponde ad interrogare il database per ottenere
        // i risultati della query. Materialmente lo fa la classe derivata da questa.
        dataProducer()
            .then((data) => {
                this.formatResponse(res, data, filter, subscribe);
                if (subscribe) {
                    // se il client vuole essere avvisato di modifiche sul database
                    // che impattano sulla sua richiesta, memorizzo i risultati ottenuti
                    // adesso, per poi poterli confrontare con quelli che otterrò in futuro.
                    let lastData = data;
                    // registro la subscription
                    const subscription = this.getUpdates(req).subscribe(() => {
                        // quando arrivo qui significa che nella tabella del database
                        // qualcosa è cambiato (o, più precisamente, che la classe derivata da 
                        // questa mi ha mandato una notifica, che diamo per scontato corrisponda
                        // al fatto che qualcosa nella tabella di database è cambiato).

                        // eseguo quindi nuovamente la stessa query:
                        dataProducer()
                            .then((newData) => {
                                // confronto i nuovi risultati (newData) con i vecchi (lastData)
                                // usando lodash (vedere la import di _ qui sopra)
                                if (!_.isEqual(newData, lastData)) {
                                    // se i dati sono cambiati (NOT isEqual), memorizzo i nuovi
                                    // dati ed invio una nuova risposta al client sulla connessione
                                    // SSE
                                    lastData = newData;
                                    this.formatResponse(res, newData, filter, subscribe);
                                }
                            })
                    });
                    
                    SSEController.totalSubscriptions++;
                    console.log("New SSE subscription active (total: " + SSEController.totalSubscriptions + ")");

                    // tengo aperta la connessione con il client al massimo per un timeout
                    // chiesto dal client e limitato prima a 86400 secondi (24 ore). Dopo 
                    // tale timeout chiudo la connessione con il client, il quale, se vuole,
                    // ne farà una nuova (ci pensa EventSource lato client).
                    setTimeout(() => {
                        subscription.unsubscribe(); // libero la memoria lato server
                        res.end(); // chiudo la connessione con il client
                        SSEController.totalSubscriptions--;
                        console.log("SSE subscription timed out (total: " + SSEController.totalSubscriptions + ")");
                    }, timeout * 1000);
                }
            })
            .catch((err) => {
                this.formatError(res, err, subscribe);
            });
    }

    public formatResponse(
        res: Response,
        data: any,
        filter?: DataFilter,
        subscribe: boolean = false
    ): void {
        // qui ho un dubbio, ovvero se sia meglio usare un nome di event specifico
        // per il caso 404, oppure se sia meglio ritornare un array vuoto con
        // l'event 'results', cioè usare l'equivalente dello stato 200 OK, salvo
        // poi restituire il nulla cosmico.
        // Per ora è implementato usando un event specifico 'notfound', ma può darsi
        // che lato client risulti poi più comodo ricevere un normale 'results' con
        // array vuoto. 
        if (data) {
            if (filter) {
                data = filter(data);
            } else {
                data = this.defaultFilters(data);
            }
            if (subscribe) {
                // qui sarebbe res.json(data) come nel ramo 'else', ma
                // non possiamo usare res.json(), perché a sua volta chiama res.end()
                // e noi non vogliamo chiudere la connessione, dato che questo endpoint
                // fa uso dei SSE. Traduciamo quindi in stringa json a mano ed usiamo res.write().
                res.write('event: results\n');
                res.write('data: ' + JSON.stringify(data));
            } else {
                res.json(data);
            }
        } else {
            if (subscribe) {
                res.write('event: notfound\n');
            } else {
                res.status(404).end();
            }
        }
    }

    public formatError(res: Response, error: any, subscribe: boolean): void {
        if (subscribe) {
            res.write('event: 500 internal server error\n');
            res.write('data: ' + JSON.stringify(error));
        } else {
            res.status(500);
            res.json(error);
        }
    }

    public defaultFilters(data: any): any {
        return data;
    }

    /**
     * Ritorna un Obserevable che emette un segnale ogni volta che sul database
     * qualcosa è cambiato (presumibilmente nella tabella rappresentata dalla
     * classe derivata da questa che fa uso delle notifiche SSE, come per esempio
     * il controller di "prenotazione"). 
     * Non si sa se sia cambiato qualcosa per cui qualche client abbia chiesto di
     * essere avvisato, o se sia cambiato qualcosa che, al momento, non interessa 
     * a nessuno. A fronte di una emit dell'Observable ritornato, questa classe
     * esegue nuovamnte tutte le query dei client che hanno chiesto qualche tipo di
     * notifica, confronta i risultati con quelli precedentemente spediti ai client e,
     * se i risultati differiscono, invia i nuovi risultati ai client coinvolti.
     * 
     * L'implementazione di default ritorna NEVER, ovvero un Observable che non
     * emette mai nulla. Le classi derivate da questa possono ridefinire questo
     * metodo e fargli ritornare un Observable che effettivamente osservi le modifiche
     * sulla tabella di database di turno. 
     * @returns Observable
     */
    public getUpdates(_req: Request): Observable<void> {

       return NEVER; 
    }
}
