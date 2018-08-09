var express = require('express');
var todoController = require('./controller/todoController');

var app = express();

//set up the template engine
app.set('view engine', 'ejs');

//set up the static file
app.use('/public', express.static('public'));

//fire controller
todoController(app);

//listen to port
app.listen(3000);
console.log('now listening to port 3000');
