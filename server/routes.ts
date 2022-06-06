import { Application } from 'express';
import servizioRouter from './api/controllers/servizio/router';
import fornitoreRouter from './api/controllers/fornitore/router';
import sedeRouter from './api/controllers/sede/router';
import fornitoresedeRouter from './api/controllers/fornitoresede/router';
import fornitoreservizioRouter from './api/controllers/fornitoreservizio/router';
import periodoRouter from './api/controllers/periodo/router';
import presenzaRouter from './api/controllers/presenza/router';
import orarioRouter from './api/controllers/orario/router';
import prenotazioneRouter from './api/controllers/prenotazione/router';
import utenteRouter from './api/controllers/utente/router';
export default function routes(app: Application): void {
  app.use('/api/v1/servizio', servizioRouter);
  app.use('/api/v1/fornitore', fornitoreRouter);
  app.use('/api/v1/sede', sedeRouter);
  app.use('/api/v1/fornitoresede', fornitoresedeRouter);
  app.use('/api/v1/fornitoreservizio', fornitoreservizioRouter);
  app.use('/api/v1/periodo', periodoRouter);
  app.use('/api/v1/presenza', presenzaRouter);
  app.use('/api/v1/orario', orarioRouter);
  app.use('/api/v1/prenotazione', prenotazioneRouter);
  app.use('/api/v1/utente', utenteRouter);
}
