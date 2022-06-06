import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.create)
  .get('/', controller.all)
  .get('/:id', controller.byId)
  .get('/:id_sede/:id_fornitore', controller.existIds)
  .put('/:id', controller.update)
  .delete('/:id', controller.delete);
