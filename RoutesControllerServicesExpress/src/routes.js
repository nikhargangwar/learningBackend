const express = require('express');

const {getAllTodos,getTodosById,postTodo,deleteTodo,patchTodoById,putTodoById} = require('./controllers');

const todoRouter = express.Router();


todoRouter.get('/',getAllTodos);
todoRouter.get('/:id',getTodosById);
todoRouter.post('/',postTodo);
todoRouter.delete('/:id',deleteTodo);
todoRouter.patch('/:id',patchTodoById);
todoRouter.put('/:id',putTodoById);
module.exports = todoRouter;

