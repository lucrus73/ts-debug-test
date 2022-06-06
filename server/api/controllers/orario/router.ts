import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.create)
  .get('/', controller.all)
  .get('/from/:from', controller.from)
  .get('/fromto/:from/:to', controller.fromTo)
  .get('/:id', controller.byId)
  .put('/:id', controller.update)
  .delete('/:id', controller.delete);
