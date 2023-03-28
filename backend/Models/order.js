const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
    products:{
        type:Object
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        default:"processing"
    },
    total:{
        type:Number,
        default:0
    },
    count:{
        type:Number,
        default:0
    },
    date:{
        type:String,
        default:new Date().toISOString().split('T')[0] // split it on "T" and time right and Zero so  before you take the first one
    },
    address:{
        type:String,
    },
    country:{
        type:String
    },

},{minimize:false}) // it's actually an object so really nice to be false so that we don't remove empty items we want to keep empty items even empty object or empty array
const Order = mongoose.model("Order", OrderSchema);
module.exports=Order
