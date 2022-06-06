// import ExamplesService from '../../services/examples.service';
import { Op } from '@sequelize/core';
import { Request, Response } from 'express';
import db from '../../models';

export class Controller {
  all(_: Request, res: Response): void {
    db.FornitoreSede.findAll().then((r: any) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params['id']
    db.FornitoreSede.findByPk(id).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  existIds(req: Request, res: Response): void {
    const ids = req.params['id_sede'];
    const idf = req.params['id_fornitore'];    
    db.FornitoreSede.findAll({where: {[Op.and]: [{SedeId: {[Op.eq]:ids}}, {FornitoreId: {[Op.eq]:idf}}]}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    db.FornitoreSede.create(req.body).then((r: any) =>
      res.status(201).location(`/api/v1/fornitoresede/${r.id}`).json(r)
    );
  }

  update(req: Request, res: Response): void{
    const id = req.params.id;
    db.FornitoreSede.update(req.body, {where: {id: id}}).then((r: any) =>
      res.status(201).json(r))
  }

  delete(req: Request, res: Response): void{
    const id = req.params.id;
    db.FornitoreSede.destroy({where: {id: id}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }
}
export default new Controller();
