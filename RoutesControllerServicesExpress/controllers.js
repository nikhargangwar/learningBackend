const data = require('./data');

const getAllTodos =  (req,res)=>{
    res.send(data);
};

const getTodosById =(req,res)=>{
    const id = req.params.id;    
    const todo = data.find((todo) => todo.id === parseInt(id));

    if(!todo)
    {   return res.send('no such todo exist'); }
    return res.send(todo);
};

const postTodo = (req,res)=>{
    const body = req.body;
    body['completed'] = false;
    data.push(body);
    return res.send('item has been added successfully');
    
};

const deleteTodo = (req,res)=>{
    const id = req.body.id;
    const todoIndex = data.findIndex((todo)=>todo.id === parseInt(id));

    data.splice(todoIndex,1);
    return res.send('item has been deleted successfully');
};

const patchTodoById = (req,res)=>{
    const {id,title,description}= req.body;
    const todo = data.find((todo)=>todo.id===parseInt(req.params.id));
    if(id)todo.id = id;
    if(title) todo.title = title;
    if(description)todo.description = description;

    return res.send(todo);
};

const putTodoById = (req,res)=>{
    const {id,title,description}= req.body;
    const todo = data.find((todo)=>todo.id===parseInt(req.params.id));

    todo.id = id;
    todo.title = title;
    todo.description = description;
    return res.send(todo);
};
module.exports= {getAllTodos,getTodosById,postTodo,deleteTodo,patchTodoById,putTodoById};