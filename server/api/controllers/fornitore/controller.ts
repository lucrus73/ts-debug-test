// import ExamplesService from '../../services/examples.service';
import { Request, Response } from 'express';
import db from '../../models';

export class Controller {
  all(_: Request, res: Response): void {
    db.Fornitore.findAll().then((r: any) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params.id;
    db.Fornitore.findByPk(id).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    db.Fornitore.create(req.body).then((r: any) =>
      res.status(201).location(`/api/v1/fornitore/${r.id}`).json(r)
    );
  }

  update(req: Request, res: Response): void{
    const id = req.params.id;
    db.Fornitore.update(req.body, {where: {id: id}}).then((r: any) =>
      res.status(201).json(r))
  }

  delete(req: Request, res: Response): void{
    const id = req.params.id;
    db.Fornitore.destroy({where: {id: id}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }
}
export default new Controller();
