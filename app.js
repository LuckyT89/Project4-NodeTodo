/*
For this app we are using MongoDB. They let you store a database in the cloud for free up to 500MB. We are also
going to install the node package called mongoose which lets us interact with a MongoDB database more easily. 
*/

var express = require('express');
var todoController = require('./controllers/todoController'); 

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public')); 

// fire controllers
todoController(app);

// listen to port
var PORT = process.env.PORT || 3000; // The process.env.PORT property is for running on Heroku. If you run this locally, it will use port 5000 instead. 
app.listen(PORT);
console.log('You are listening to port 3000');