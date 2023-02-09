const data = require('./data');
const HTTPError = require('../src/utils/httperror');

const todosService = require('./services.js');
// const getAllTodos =  (req,res)=>{
//     res.send(data);
// };

const getAllTodos = async (req, res) => {
    try {
        res.send(await todosService.getAllTaskFromDb());
    }
    catch (err) {
        if (err instanceof HTTPError) {
            return res.status(err.code).send({ message: err.message });
        }
        res.status(500).send(err.message);
    }
};



// const getTodosById =(req,res)=>{
//     const id = req.params.id;    
//     const todo = data.find((todo) => todo.id === parseInt(id));

//     if(!todo)
//     {   return res.send('no such todo exist'); }
//     return res.send(todo);
// };

const getTodosById = (async (req, res) => {
    try {
        const id = req.params.id;
        return res.send(await todosService.getTodoFromDb(id));
    } catch (err) {
        if (err instanceof HTTPError) {
            return res.status(err.code).send({ message: err.message })
        }
        res.status(500).send(err.message);
    }
});


// const postTodo = (req,res)=>{
//     const body = req.body;
//     body['completed'] = false;
//     data.push(body);
//     return res.send('item has been added successfully');

// };

const postTodo = (async (req, res) => {
    try {
        const body = req.body;
        const result = await todosService.postTodoToDb(body);
        res.send(result);
    } catch (err) {
        if (err instanceof HTTPError) {
            return res.status(err.code).send({ message: err.message })
        }
        res.status(500).send(err.message);
    }
});

// const deleteTodo = (req,res)=>{
//     const id = req.body.id;
//     const todoIndex = data.findIndex((todo)=>todo.id === parseInt(id));

//     data.splice(todoIndex,1);
//     return res.send('item has been deleted successfully');
// };

const deleteTodo = (async (req, res) => {
    try {
        const id = req.params.id;

        const result = await todosService.deleteTodoFromDb(id);

        if (result) {
            return res.json({ message: 'item deleted' });
        }
        else {
            return res.json({ message: 'no such item exist' });
        }
    }
    catch (err) {
        if (err instanceof HTTPError) {
            return res.status(err.code).send({ message: err.message })
        }
        res.status(500).send(err.message);
    }


});


// const patchTodoById = (req,res)=>{
//     const {id,title,description}= req.body;
//     const todo = data.find((todo)=>todo.id===parseInt(req.params.id));
//     if(id)todo.id = id;
//     if(title) todo.title = title;
//     if(description)todo.description = description;

//     return res.send(todo);
// };

const patchTodoById = (async (req, res) => {

    try {
        const { title } = req.body;
        const id = req.params.id;

        const result = await todosService.patchTodoByIdFromDb(title, id);

        if (result) {
            return res.json({ message: 'item updated' });
        }
        else {
            return res.json({ message: 'no such item exist' });
        }

    } catch (err) {
        if (err instanceof HTTPError) {
            return res.status(err.code).send({ message: err.message })
        }
        res.status(500).send(err.message);
    }

});

const putTodoById = (req, res) => {
    const { id, title, description } = req.body;
    const todo = data.find((todo) => todo.id === parseInt(req.params.id));

    todo.id = id;
    todo.title = title;
    todo.description = description;
    return res.send(todo);
};
module.exports = { getAllTodos, getTodosById, postTodo, deleteTodo, patchTodoById, putTodoById };