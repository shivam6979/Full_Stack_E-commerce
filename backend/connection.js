require('dotenv').config();
const mongoose = require('mongoose');
const connectionStr='mongodb+srv://shiva:ZxJf1KONMThYSpCU@cluster0.yuxls.mongodb.net/ecommerce';
mongoose.connect(connectionStr,{useNewUrlParser:true})
.then(()=>console.log('connected to mongoDb'))
.catch(err=> console.log(err));
mongoose.connection.on('error',err=>{
    console.log(err)
})
console.log('hi')


