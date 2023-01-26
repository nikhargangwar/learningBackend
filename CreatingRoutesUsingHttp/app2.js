const http = require('http');
const Todo = require('./controller');
const data = require('./data');
const { getReqData } = require('./utils');

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    
    // /api/todos : GET
    if (req.url === '/api/todos' && req.method === 'GET') {
        //this referes to what response to be displayed at output window with port
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // When sending data to a web server, the data has to be a string. Stringify converts json data to string
        res.end(JSON.stringify(data));
    }

    // /api/todos/:id : GET
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'GET') {
        try {
            // get id from url
            const id = req.url.split('/')[3];
            // get todo
            let todo = data.find((todo) => todo.id === parseInt(id));

            if (!todo) {
                // return the todo
                reject(`Todo with id ${id} not found `);
            } 
            // set the status code and content-type
            res.writeHead(200, { 'Content-Type': 'application/json' });
            // send the data
            res.end(JSON.stringify(todo));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { 'Content-Type': 'application/json' });
            // send the error
            res.end(JSON.stringify({ message: 'Such id does not exist' }));
        }
    }

    // /api/todos/:id : DELETE
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'DELETE') {
        try {
            // get the id from url
            const id = req.url.split('/')[3];
            // delete todo
            let todo = data.find((todo)=>todo.id===parseInt(id)) ;
            if(!todo)
            {
                reject(`No todo with ${id} found`);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('todo deleted succefully' );
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { 'Content-Type': 'application/json' });
            // send the error
            res.end(JSON.stringify({ message: 'No such todo id found' }));
        }
    }

    // /api/todos/:id : UPDATE/patch
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'PATCH') {
        try {
            // get the id from the url
            const id = req.url.split('/')[3];
            // update todo
            let updated_todo = data.find((todo)=>todo.id===parseInt(id)) ;
            if(!updated_todo)
            {
                reject(`No todo with ${id} found`);
            }

            updated_todo['completed'] = true;   //just modifying specific thing in a row means patch
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updated_todo));
        } catch (error) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No such todo exist with given id' }));
        }
    }

    // /api/todos/ : POST
    else if (req.url === '/api/todos' && req.method === 'POST') {
        console.log('executing the code');
        // get the data sent along
        let body = '';
        req.on('data',chunk=>{
            //console.log("chunk",chunk)
            body+=chunk.toString();
        });
        console.log(body);
        req.on('end',()=>{
            //console.log("body",body)
            res.writeHead(200,{ 'Content-Type': 'application/json' });
            body = JSON.parse(body);   // converting body which we got as a string into object
            body['completed']=false;     //VERY VERY important
            data.push(body);
            res.end('task successfully added');
        });
    }
    // No route present
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});