var express = require('express');
var app = express();
var db = require('./db.js');
var bodyparser = require('body-parser');
var _ = require("underscore");
var PORT = process.env.PORT||3000;
var todos = [];
var currentId = 0;


app.use(bodyparser.json());

app.get('/',function(req,res)
       {
    res.send('Todo API Root');
    
});

app.get('/todos',function(req,res){
    res.json(todos);
    
});

app.get('/todos/:id',function(req,res)
{
  
   
    var findObj = _.findWhere(todos,{id:req.params.id});

    if(findObj)
        {
    res.json(findObj);
        }
    else
        {
            res.status(404).send();
        }
});

app.delete('/delTodos/:id',function(req,res)
{
    var findObj;
    todos.forEach(function(obj)
    {
        if( obj.id == req.params.id)
        findObj = obj;
    });
    
    if(findObj)
    {
        todos.slice(todos.indexOf(findObj),1);  
        //res.status(200).send();
        res.json(todos);
    }
    else
    {
            res.status(404).send();
    }
    
    res.send("Hi");
});

app.post('/todos',function(req,res)
{
    var body = req.body;
    db.todo.create(body).then(function(todo)
                            {
        res.json(todo.toJSON());
    },function(e)
    {
        res.status(400).json(e);
    });
   /* body.id = ++currentId;
    todos.push(body);
    
    console.log("Description :"+JSON.stringify(todos));
    res.json(todos);*/
});

db.sequelize.sync().then(function(){
    app.listen(PORT,function(){
    console.log("Server Start");
    });
},function()
{
    
});




