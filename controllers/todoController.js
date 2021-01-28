// Things like setting up routes and passing data to the view will be handled in this controller

var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://Tyler1:1234@cluster0.nfemg.mongodb.net/database1?retryWrites=true&w=majority') // Need to add URI thing here!!!

// Create a schema- a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

/*
Here we are creating a model- this should start with a capital letter, ie 'Todo'
Note that the first parameter in the model method is a string and this will be the name of the collection in MongoDB- you have databases and inside each database 
you can have different collections, each containing documents. MongoDB will add an 's' to the collection name you use here so in this example, we name the 
collection 'Todo' and the database name is 'database1' which means we will see a collection in this database called 'Todos'- notice the 's' at the end of 'Todos'. 
If we named the collection 'Thing' it would show up in MongoDB as 'Things'. Just pointing this out because this caused some confusion in the past. 
*/
var Todo = mongoose.model('Todo', todoSchema); 



var urlencodedParser = bodyParser.urlencoded({extended: false}); 

module.exports = function(app){

// This will handle the user going to the main url
app.get('/todo', function(req, res){
    // get data from MongoDB and pass it to the view
    // The find() method can return all the items in a collection or a specific one. The empty object as the first parameter says to get all items from the collection. 
    Todo.find({}, function(err, data){
        if (err) throw err;
        res.render('todo', {todos: data});
    });
     
});

// This will handle the user submitting a new list item 
app.post('/todo', urlencodedParser, function(req, res){ 
    // Get data from the view and add it to MongoDB
    var newTodo = Todo(req.body).save(function(err, data){
        if (err) throw err;
        res.json(data);
    });
});

// This will handle deleting an item from the list
app.delete('/todo/:item', function(req, res){
    // Delete the requested item from MongoDB
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if (err) throw err;
        res.json(data);
    });
});

};