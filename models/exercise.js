const {Schema, model} = require('mongoose')

const schemaExercise = new Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: String,
    idUser: Schema.Types.ObjectId
},{
    versionKey:false
})

module.exports = model('exercises', schemaExercise);