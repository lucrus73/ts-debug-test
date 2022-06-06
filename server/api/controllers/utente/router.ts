import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.create)
  .get('/', controller.all)
  .get('/cf/:cf', controller.findByCf)
  .get('/sso/:sso', controller.findBySso)
  .get('/:id', controller.byId)
  .put('/:id', controller.update)
  .delete('/:id', controller.delete);
