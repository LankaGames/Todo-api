var express = require('express');
var app = express();
var PORT = process.env.PORT||3000;
var todos = [{id:1,description:"Meet friend",completed:false},
            {id:2,description:"Meet Girl Friend",completed:false}];

app.get('/',function(req,res)
       {
    res.send('Todo API Root');
    
});

app.get('/todos',function(req,res){
    res.json(todos);
    
});

app.get('/todos/:id',function(req,res)
{
    var findObj;
    todos.forEach(function(obj){
        
        if(obj.id == req.params.id)
        {
            findObj = obj;
            return;
        }
        
    });

    res.json(findObj);
});

app.listen(PORT,function(){
    console.log("Server Start");
});


function GetObjById(id)
{
    

}