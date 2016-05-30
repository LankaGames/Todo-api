module.exports = function(sequlize,Datatypes)
{
    return sequlize.define('todo',
                          {
        description:{
            type:Datatypes.STRING,
            allowNull:false,
            validate:{len:[1,250]
                     }
        },
        completed:{
            type:Datatypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
            
        }
    });
}