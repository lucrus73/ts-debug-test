// import ExamplesService from '../../services/examples.service';
import { Op } from '@sequelize/core';
import { Request, Response } from 'express';
import db from '../../models';

export class Controller {
  all(_: Request, res: Response): void {
    db.Orario.findAll().then((r: any) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params.id;
    db.Orario.findByPk(id).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    db.Orario.create(req.body).then((r: any) =>
      res.status(201).location(`/api/v1/orario/${r.id}`).json(r)
    );
  }

  update(req: Request, res: Response): void{
    const id = req.params.id;
    db.Orario.update(req.body, {where: {id: id}}).then((r: any) =>
      res.status(201).json(r))
  }

  delete(req: Request, res: Response): void{
    const id = req.params.id;
    db.Orario.destroy({where: {id: id}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  from(req: Request, res: Response): void {
    const from = req.params.from;
    db.Orario.findAll({where: {dalle: {[Op.gte]:from}}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  fromTo(req: Request, res: Response): void {
    const from = req.params.from;
    const to = req.params.to;
    db.Orario.findAll({where: {[Op.and]: [{dalle: {[Op.gte]:from}}, {alle: {[Op.lte]:to}}]}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

}
export default new Controller();
