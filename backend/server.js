const express =require("express") ;
require("dotenv").config();
const cors = require("cors")
const app = express();
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const stripe = require("stripe")(process.env.STRIPE_SECRET);


require('./connection')
const io = new Server(server,{
    cors:"*",
    method:"*"
})

const User = require('./Models/User');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");


app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/users',userRoutes)
app.use('/products', productRoutes);
app.use("/orders",orderRoutes)
app.use('/images', imageRoutes);


// for client checkoutForm [04:48:00]
app.post("/create-payment",async(req,res)=>{
    const {amount} = req.body;
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            payment_method_types:['card']
    })
        res.status(200).json(paymentIntent)
        // console.log("paymentIntent-------", paymentIntent)
    }
    catch(e){res.status(500).json(e.message)}

})

server.listen(8000,()=>{
    console.log("server is running on port:- ",8000)
})