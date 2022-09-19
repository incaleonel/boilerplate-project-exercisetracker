const {Schema, model} =  require('mongoose');


const schemaUser = new Schema({
    username:{
        type:String,
        required:true
    }
},{
    versionKey:false
})

module.exports = model('users', schemaUser);