const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./connection')
const dataLog = require('./models/join')
const mongoose = require('mongoose')
const User = require('./models/user')
const Log = require('./models/log')
const Exercise = require('./models/exercise')
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', async(req, res) => {
    const obj = {
      _id: mongoose.Types.ObjectId(),
      username : req.body.username
    }
    const user = new User(obj)
    
    await user.save().then(()=>res.json(obj))
               .catch((err)=>res.send(err.message))

    const log = new Log({count: 0, idUser: obj._id})
    await log.save().then(()=>console.log('NEW log created'))
                    .catch((err)=>console.log(err))
    
});
app.get('/api/users', async(req, res) => {
  let users = await User.find();

  res.json(users);
  
})

app.post('/api/users/:_id/exercises', async(req, res) =>{
  try{
    const object = {
        description : req.body.description,
        duration : Number(req.body.duration),
        date : req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString()
    }
        mongoose.Types.ObjectId(req.params._id)
    const user = await User.findById(req.params._id);
      console.log(Object.assign({},user._doc,object))
        res.json(Object.assign({},user._doc,object));
    
    object.idUser = new mongoose.Types.ObjectId(user._doc._id);
    const exercise = new Exercise(object)
        await exercise.save()
      
          let count = await Exercise.countDocuments({idUser: req.params._id})
          await Log.updateOne({idUser: req.params._id},{count: count})
          console.log('Log.count were update of idUser:',req.params._id)
    
      }catch(err){
      res.send(err.message)
      }

});
app.get('/api/users/:_id/logs', async(req,res)=>{
try{

    let from = new Date(req.query.from).valueOf();
    let to = new Date(req.query.to).valueOf();
    let limit = Number(req.query.limit);
    let data = await dataLog(Log, req.params._id)
    let exerciseFiltered = data[0].log;
    
  if(from){
    exerciseFiltered = exerciseFiltered.filter((exercise) => new Date(exercise.date).valueOf() > from);
  }
  if(to){
    exerciseFiltered = exerciseFiltered.filter(exercise => new Date(exercise.date).valueOf() < to);
  }
  if(limit){
    exerciseFiltered = exerciseFiltered.slice(0,limit);
  }
 
  data[0].log = exerciseFiltered;
  data[0].count = exerciseFiltered.length
  
    
    res.json(data[0])
  }catch(err){
    res.send(err)
  }
  
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

