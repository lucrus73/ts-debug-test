import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.create)
  .get('/', controller.all.bind(controller)) // la bind() rende "this" disponibile all'interno della funzione all()
  .get('/from/:from', controller.from.bind(controller))
  .get('/fromto/:from/:to', controller.fromTo.bind(controller))
  .get('/:id', controller.byId.bind(controller))
  .put('/:id', controller.update)
  .delete('/:id', controller.delete);
