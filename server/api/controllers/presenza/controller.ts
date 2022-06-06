// import ExamplesService from '../../services/examples.service';
import { Op } from '@sequelize/core';
import { Request, Response } from 'express';
import db from '../../models';

export class Controller {
  all(_: Request, res: Response): void {
    db.Presenza.findAll().then((r: any) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params.id;
    db.Presenza.findByPk(id).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    db.Presenza.create(req.body).then((r: any) =>
      res.status(201).location(`/api/v1/presenza/${r.id}`).json(r)
    );
  }

  update(req: Request, res: Response): void{
    const id = req.params.id;
    db.Presenza.update(req.body, {where: {id: id}}).then((r: any) =>
      res.status(201).json(r))
  }

  delete(req: Request, res: Response): void{
    const id = req.params.id;
    db.Presenza.destroy({where: {id: id}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  from(req: Request, res: Response): void {
    const from = req.params.from;
    db.Presenza.findAll({where: {dalle: {[Op.gte]:from}}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  fromTo(req: Request, res: Response): void {
    const from = req.params.from;
    const to = req.params.to;
    db.Presenza.findAll({where: {[Op.and]: [{dalle: {[Op.gte]:from}}, {alle: {[Op.lte]:to}}]}}).then((r: any) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

}
export default new Controller();
