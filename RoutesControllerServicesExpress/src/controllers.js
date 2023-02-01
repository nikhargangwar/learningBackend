const data = require('./data');
const db = require('../database/models')
const todosService = require('./services.js')
const Joi = require('joi');

// const getAllTodos =  (req,res)=>{
//     res.send(data);
// };

const getAllTodos = async (req,res)=>{
    res.send(await todosService.getAllTaskFromDb());
}



// const getTodosById =(req,res)=>{
//     const id = req.params.id;    
//     const todo = data.find((todo) => todo.id === parseInt(id));

//     if(!todo)
//     {   return res.send('no such todo exist'); }
//     return res.send(todo);
// };

const getTodosById =(async(req,res)=>{

    const id = req.params.id;
    return res.send( await todosService.getTodoFromDb(id) );
});


// const postTodo = (req,res)=>{
//     const body = req.body;
//     body['completed'] = false;
//     data.push(body);
//     return res.send('item has been added successfully');
    
// };

const postTodo = (async (req,res)=>{
    const schema = Joi.object({
        title: Joi.string()
            .min(3)
            .max(30)
            .required(),
        isComplete: Joi.boolean()
    })

    const{error,value} = schema.validate(req.body);

    if(!error){
        const body = req.body;
        const result = await todosService.postTodoToDb(body)
      res.send(result);
    }
    else{
        res.send(error.message);
    }
    
    
});

// const deleteTodo = (req,res)=>{
//     const id = req.body.id;
//     const todoIndex = data.findIndex((todo)=>todo.id === parseInt(id));

//     data.splice(todoIndex,1);
//     return res.send('item has been deleted successfully');
// };

const deleteTodo = (async(req,res)=>{

    const id = req.params.id;

    const result = await todosService.deleteTodoFromDb(id);
   
    if(result)
    {
        return res.json({message:"item deleted"});
    }
    else{
        return res.json({message:"no such item exist"});
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

const patchTodoById =(async(req,res)=>{
    const {title}= req.body;
    const id = req.params.id;
    
   const result =  await todosService.patchTodoByIdFromDb(title,id)

   if(result)
   {
    return res.json({message:"item updated"});
   }
   else{
    return res.json({message:"no such item exist"});
   }
    
});

const putTodoById = (req,res)=>{
    const {id,title,description}= req.body;
    const todo = data.find((todo)=>todo.id===parseInt(req.params.id));

    todo.id = id;
    todo.title = title;
    todo.description = description;
    return res.send(todo);
};
module.exports= {getAllTodos,getTodosById,postTodo,deleteTodo,patchTodoById,putTodoById};