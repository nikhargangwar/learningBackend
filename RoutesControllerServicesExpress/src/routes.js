const express = require('express');

const {getAllTodos,getTodosById,postTodo,deleteTodo,patchTodoById,putTodoById} = require('./controllers');
const {validateGetId,validatePostSchema,validateLogin,validateReq} = require('../src/middleware/joiValidator');
const todoRouter = express.Router();

todoRouter.post('/login',validateLogin);
todoRouter.get('/',validateReq,getAllTodos);
todoRouter.get('/:id',validateReq,validateGetId,getTodosById);
todoRouter.post('/',validateReq,validatePostSchema,postTodo);
todoRouter.delete('/:id',validateReq,deleteTodo);
todoRouter.patch('/:id',validateReq,patchTodoById);
todoRouter.put('/:id',validateReq,putTodoById);


module.exports = todoRouter;

