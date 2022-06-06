// import ExamplesService from '../../services/examples.service';
import { Op } from '@sequelize/core';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import db from '../../models';
import { SSEController } from '../sse/controller';

export class Controller extends SSEController {

  all(req: Request, res: Response): void {
    this.event(req, res, () => db.Prenotazione.findAll());
  }

  byId(req: Request, res: Response): void {
    const id = req.params.id;
    this.event(req, res, () => db.Prenotazione.findByPk(id));
  }

  create(req: Request, res: Response): void {
    db.Prenotazione.create(req.body).then((r: any) =>
      res.status(201).location(`/api/v1/prenotazione/${r.id}`).json(r)
    );
  }

  update(req: Request, res: Response): void{
    const id = req.params.id;
    db.Prenotazione.update(req.body, {where: {id: id}}).then(
      (r: any) => {
        return res.status(200).json(r); 
      }, (error: any) => { 
        return res.status(404).json(error); } );
  }

  delete(req: Request, res: Response): void{
    const id = req.params.id;
    db.Prenotazione.destroy({where: {id: id}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  from(req: Request, res: Response): void {
    const from = req.params.from;
    this.event(req, res, () => db.Prenotazione.findAll({where: {oraAppuntamento: {[Op.gte]:from}}}));
  }

  fromTo(req: Request, res: Response): void {
    const from = req.params.from;
    const to = req.params.to;
    this.event(req, res, () => db.Prenotazione.findAll({where: {[Op.and]: [{oraAppuntamento: {[Op.gte]:from}}, {oraAppuntamento: {[Op.lte]:to}}]}}));
  }

  public getUpdates(req: Request): Observable<void> {
    console.log("SSE richiede notifiche");
    return new Observable(subscriber => {
      console.log("aggiungo hooks a Sequelize");
      // const f = subscriber.next.bind(subscriber); // riferimento alla funzione next()
      const f = function() {
        console.log("hook chiamato");
        subscriber.next();
      };
      const requestIp = require('request-ip');

      const hooks = ["afterCreate", "afterDestroy", "afterUpdate", "afterSave", "afterUpsert"];
      for (let index = 0; index < hooks.length; index++) {
        const hook = hooks[index];
        const name = __dirname + ":" + hook + ":" + requestIp.getClientIp(req);
        console.log(hook + ": " + name); 
        db.Prenotazione.addHook(hook, name, f);        
      }
    });
    
  }

}
export default new Controller();
