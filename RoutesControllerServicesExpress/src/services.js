const db = require('../database/models');


const getAllTaskFromDb= async()=>{
    const data = await db.Task.findAll();
    return data;
};

const getTodoFromDb  = async(id)=>{
    const todo = await db.Task.findAll({where:{id:id}});

    // if(todo.length===0)
    // {   return 'no such todo exist'; }
    return todo;
};

const postTodoToDb = async(body)=>{
    const result = await db.Task.create({
        title: body.title,
        iscomplete: false,
    
    });
    return result;
};

const deleteTodoFromDb = async(id)=>{

    const deletedTodo = await db.Task.destroy({where:{id:id}});

    return deletedTodo;
   
};

const patchTodoByIdFromDb =async(title,id)=>{
    const updatedTodo = await db.Task.update({ title: title }, {
        where: {
            id: id
        }
    });
    return updatedTodo;
};
module.exports = {getAllTaskFromDb,getTodoFromDb,postTodoToDb,deleteTodoFromDb,patchTodoByIdFromDb};