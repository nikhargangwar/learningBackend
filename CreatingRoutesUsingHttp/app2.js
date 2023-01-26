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



//khushil code


// const http = require('http');
// const PORT = 3000;

// let groceriesList = [
//   {
//     id: 1,
//     title: 'Buy Apples',
//   },
//   {
//     id: 2,
//     title: 'Buy Corn Flakes',
//   }
// ];



// const server = http.createServer((request, response) => {
//   response.setHeader('Content-Type', 'json');
//   const route = request.url.split('?')[0];
//   let todoItem ;
//   let searchQuery;
//   if(request.url.includes('?')){
//     searchQuery = request.url.split('?')[1].split('=');
//     todoItem = searchQuery[1];
//   }
//   console.log(`${request.method} ${route} -- ${todoItem}`);
//   switch (route) {
//   case '/tasks':
//     switch(request.method){
//     case 'GET':
//       response.write(JSON.stringify(groceriesList));
//       response.end();
//       break;
//     case 'POST':
//       groceriesList.push({id:groceriesList.length+1, title: todoItem});
//       response.write(JSON.stringify(groceriesList));
//       response.end();
//       break;
//     case 'DELETE':
//       groceriesList = groceriesList.filter((item)=>item.id !== Number(todoItem));
//       response.write(JSON.stringify(groceriesList));
//       response.end();
//       break;
//     case 'PUT':
//       groceriesList = groceriesList.map((item)=>{
//         if(item.id === todoItem){
//           return {
//             id: item.id,
//             title: 'New change',
//           };
//         }
//         return item;
//       });
//       response.write(JSON.stringify(groceriesList));
//       break;
//     default:
//       response.write('<h1>Hello World</h1>');
//       response.end();
//       break;
//     }
//   }});

// server.listen(PORT, () => {
//   console.log(`The server is running at port: ${PORT}`);
// });