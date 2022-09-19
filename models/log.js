const {Schema, model} =  require('mongoose');

const schemaLog = new Schema({
    count: Number,
    idUser: Schema.Types.ObjectId
},{
    versionKey:false
})

module.exports = model('logs', schemaLog)