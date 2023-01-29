const express = require('express');
const data = require('./data');

const app = express();

app.use(express.json());

app.get('/api/todos',(req,res)=>{
    res.send(data);
});

app.get('/api/todos/:id',(req,res)=>{
    const id = req.params.id;
    const todo = data.find((todo) => todo.id === parseInt(id));
    if(!todo){
       return res.send('Item with such id not found');
    }
    return res.send(todo);
});

app.post('/api/todos',(req,res)=>{
    let body = req.body;
     
    body['isCompleted']=false;
    data.push(body);
    res.status(200).send(body);
});

app.delete('/api/todos/:id', (req,res) => {
    const id = req.params.id;
    const todoIndex = data.findIndex((todo) => todo.id === parseInt(id));

    if (!todoIndex) {
        res.status(500).send('Account not found.');
    } 

    data.splice(todoIndex,1);
    res.status(200).send('item deleted succefully');

});

app.put('/api/todos/:id',(req,res)=>{
    let id = req.params.id;
    let todo = data.find((todo) => todo.id === parseInt(id));
    if(!todo){
        res.send('Item with such id not found');
    }

    todo.title = req.body.title,
    todo.description = req.body.description;
    res.send(todo);
});

app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});
//data.find((todo)=>{todo.id===parseInt(req.params)})
app.listen(3000,()=> console.log('Example app listening on port 3000'));