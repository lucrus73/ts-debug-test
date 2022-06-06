import { Request, Response } from 'express';
import db from '../../models';
export class Controller {
  all(_: Request, res: Response): void {
    db.Servizio.findAll().then((r: any) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params.id;
    db.Servizio.findByPk(id).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    db.Servizio.create(req.body).then((r: any) =>
      res.status(201).location(`/api/v1/servizio/${r.id}`).json(r)
    );
  }

  update(req: Request, res: Response): void{
    const id = req.params.id;
    console.log(id);
    db.Servizio.update(req.body, {where: {id: id}}).then((r: any) =>
      res.status(201).json(r))
  }

  delete(req: Request, res: Response): void{
    const id = req.params.id;
    console.log(id);
    
    db.Servizio.destroy({where: {id: id}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }
}
export default new Controller();
