// import ExamplesService from '../../services/examples.service';
import { Op } from '@sequelize/core';
import { Request, Response } from 'express';
import db from '../../models';

export class Controller {
  all(_: Request, res: Response): void {
    db.FornitoreServizio.findAll().then((r: any) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params['id']
    db.FornitoreServizio.findByPk(id).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  existIds(req: Request, res: Response): void {
    const ids = req.params['id_servizio'];
    const idf = req.params['id_fornitore'];    
    db.FornitoreServizio.findAll({where: {[Op.and]: [{ServizioId: {[Op.eq]:ids}}, {FornitoreId: {[Op.eq]:idf}}]}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    db.FornitoreServizio.create(req.body).then((r: any) =>
      res.status(201).location(`/api/v1/fornitoreservizio/${r.id}`).json(r)
    );
  }

  update(req: Request, res: Response): void{
    const id = req.params.id;
    db.FornitoreServizio.update(req.body, {where: {id: id}}).then((r: any) =>
      res.status(201).json(r))
  }

  delete(req: Request, res: Response): void{
    const id = req.params.id;
    db.FornitoreServizio.destroy({where: {id: id}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }
}
export default new Controller();
