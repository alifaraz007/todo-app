var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended: false});

//connect to database
mongoose.connect('mongodb://alibaba007:alibaba007@ds215822.mlab.com:15822/alibaba', { useNewUrlParser: true });

//create schema which is a blueprint for database
var todoSchema =  new mongoose.Schema({
  item: String
});

//create model
var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){
  app.get('/todo', function(req, res){
    //get data from database and render it in view
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data from view and update it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      //sending data to ajax success function
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });
};
