// [05:09:21]
const router = require("express").Router();
const Order = require("../Models/order")
const User = require("../Models/User");

function formateDate(date){

}

//-------------- creating an order
router.post("/", async (req,res)=>{
    const {userId, cart, country, address}= req.body;
    try{
        const user = await User.findById(userId);
        const order = await Order.create({owner:user._Id, products:cart, country, address});
        order.count = cart.count;
        order.total = cart.total;
        await order.save();
        user.cart= {total:0, count:0};
        user.orders.push(order);
        user.markModified("orders");//markModified(), it manually sets the array column that we are
// trying to update as modified and this makes mongoose detect the column change and updates the DB.
        await user.save();
        res.status(200).json(user);
    }
    catch(e){
        res.status(400).json(e.message)
    }
});

// getting all orders
router.get("/", async(req,res)=>{
    try{
        // {
        const orders = await Order.find().populate("owner", ["email","name"]) // populate with the owner and take the email, name,
// }
        res.status(200).json(orders);
    }
    catch(e){
        res.status(400).json(e.message)
    }
})

//shipping order [06:08:10]
router.patch('/:id/mark-shipped', async(req,res)=>{
    const {ownerId} = req.body;
    const {id} = req.params;
    try{
        const user = await User.findById(ownerId);
        await Order.findByIdAndUpdate(id,{status:"shipped"});
        const orders = await Order.find().populate("owner",["email", "name"]);
        res.status(200).json(orders)
    }
    catch(e){
        res.status(400).json(e.message)
    }
})

// endPoint for getting specific user's routes
module.exports=router;

