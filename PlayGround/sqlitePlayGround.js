var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined,{'dialect':'sqlite','storage':__dirname+'/sqlitePlayGround.sqlite'});

var TODOS = sequelize.define('todo',{description:{type :Sequelize.STRING,
                                                 allowNull :false,
                                                 validate:{len:[1,250]}
                                                 },
                                     completed:{type: Sequelize.BOOLEAN,allowNull :false,defaultValue:false}});


sequelize.sync({//force:true
               })
    .then(function()
                     {
   
        TODOS.findById(7).then(function(todo)
                              {
            if(todo)
                {
                    console.log(todo.toJSON());
                }
            else
                {
                    console.log("not found");
                }
       
        });
    })/*.then(function(todo)
    {
       return TODOS.findAll({where:{description:{$like:"%Hi%"}}});
    }).then(function(todos){
        if(todos)
        {
            todos.forEach(function(to)
                         {
                console.log(to.toJSON());
            });
        
        }
        else{
            console.log("not found");
        }
    })*/.catch(function(e){
        console.log(e);
    });

