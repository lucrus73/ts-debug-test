// import ExamplesService from '../../services/examples.service';
import { Op } from '@sequelize/core';
import { Request, Response } from 'express';
import db from '../../models';

export class Controller {
  all(_: Request, res: Response): void {
    db.Utente.findAll().then((r: any) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params.id;
    db.Utente.findByPk(id).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    db.Utente.create(req.body).then((r: any) =>
      res.status(201).location(`/api/v1/utente/${r.id}`).json(r)
    );
  }

  update(req: Request, res: Response): void{
    const id = req.params.id;
    db.Utente.update(req.body, {where: {id: id}}).then((r: any) =>
      res.status(201).json(r))
  }

  delete(req: Request, res: Response): void{
    const id = req.params.id;
    db.Utente.destroy({where: {id: id}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  findByCf(req: Request, res: Response): void {
    const cf = req.params.cf;
    db.Utente.findAll({where: {cf: {[Op.eq]:cf}}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  findBySso(req: Request, res: Response): void {
    const sso = req.params.sso;
    db.Utente.findAll({where: {idsso: {[Op.eq]:sso}}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

}
export default new Controller();
