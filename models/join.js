const mongo = require('mongoose')
async function show(Log,id){
return await Log.aggregate([
    {
        $match:  //mostrar el documento con la siguiente coincidencia
        {
            idUser : mongo.Types.ObjectId(id)
        }
    },
    {   $lookup: // vinculo la coleccion "users" con "log"
        {
            from: 'users',
            localField: 'idUser',
            foreignField: '_id',
            as: 'user'
        }
    },
    {
        $unwind:'$user' 
    },
    {
        $addFields: {
            username: '$user.username',
            _id:'$user._id'
        }
    },
    {   $lookup: //vinculo la coleccion "exercises" con "log"
        {
            from: 'exercises',
            localField: 'idUser',
            foreignField: 'idUser',
            as: 'log'
        }
    },
    {
        $project:
        {   
            user:0,
            __v:0,
            idUser:0,
            log: {_id:0, idUser:0, __v:0}
        }
    }
])
}
module.exports = show;
