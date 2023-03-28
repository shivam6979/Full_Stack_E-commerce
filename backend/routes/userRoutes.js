const router = require('express').Router();
const User = require('../Models/User');
const Order = require("../Models/order");


//------------------------ sign-up -----------------------
router.post('/signup', async(req,res)=>{
    const {name, email, password}=req.body;
    try{
        const user = await User.create({name, email, password});
        res.json(user);
    }
    catch(e){
        if(e.code===11000) return res.status(400).send('Email already exits');
        res.status(400).send(e.message);
    }
})

//------------------------ login -----------------------
router.post('/login', async(req,res)=>{
    const {email, password}= req.body;
    try{
        const user = await User.findByCredentials(email,password);
        res.json(user)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

//------------------------ get users -----------------------
router.get('/',async(req,res)=>{
    try{
        const users = await User.find({isAdmin:false}).populate('orders');
        res.json(users)
    }catch(e){
        res.status(400).send(e.message);
    }
})

// get users orders [05:19:08]
router.get("/:id/orders", async(req,res)=>{
    const {id}=req.params;
    try{
        const user = await User.findById(id).populate('orders');
        console.log(user);
        res.json(user.orders);
    }
    catch(e){
        res.status(400).send(e.message);
    }
})

module.exports=router;