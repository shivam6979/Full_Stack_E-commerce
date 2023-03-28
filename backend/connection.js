require('dotenv').config();
const mongoose = require('mongoose');
const connectionStr='';
mongoose.connect(connectionStr,{useNewUrlParser:true})
.then(()=>console.log('connected to mongoDb'))
.catch(err=> console.log(err));
mongoose.connection.on('error',err=>{
    console.log(err)
})
console.log('hi')


