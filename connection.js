
const mongoose = require('mongoose');
const database = 'Tracker';
const password = process.env['PASS'];
const uri = `mongodb+srv://leonidas:${password}@cluster0.l6x0pxk.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(uri);

mongoose.connection.on('open',()=>console.log('open database connection  TRACKER'));
mongoose.connection.on('error',(err)=>console.log('problem occurred: database connection  failed'))




