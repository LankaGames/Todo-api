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
    var query = req.query;
    var where = {};
    
    if(query.hasOwnProperty("completed"))
    {
        if(query.completed === 'true')
        {
            where.completed = true;
        }
        else if(query.completed === 'false')
        {
            where.completed = false;
        }
    }
    
    if(query.hasOwnProperty("q")&& query.q.length>0)
    {
        where.description = {
            $like:"%"+query.q+"%"
        };
    }
    
    
    db.todo.findAll(
    {
        where:where
    }).then(function(todos)
           {
        res.json(todos);
    },function(e)
           {
        res.status(500).send();
    });
    
    
});

app.get('/todos/:id',function(req,res)
{
  
   
    db.todo.findById(req.params.id).then(function(t)
    {
         if(!!t)
        res.json(t.toJSON());
           else
               res.status(404).send();
    },function(e)
    {
        res.status(500).send();
    });

    
});

app.delete('/delTodos/:id',function(req,res)
{
    db.todo.destroy(
    {
        where:
        {
            id:req.params.id
        }
    }).then(function(no){
        if(no>0)
        {
          res.status(204).send("Delete Sucessfully");      
        }
        else
        {
              res.status(404).send();  
        }
        
    },function(e){
        
    });
  
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




