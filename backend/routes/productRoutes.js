const router = require("express").Router();  // 1:47 : 00
const Product = require("../Models/Product");
const User = require('../Models/User');

// get products
router.get('/', async (req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products)
    }
    catch(e){ res.status(400).send(e.message) }
})

//  create a product
router.post('/', async(req,res)=>{
    try{
        const {name, description, price, category, images:pictures}=req.body;
        console.log('name',name)
        const product =await Product.create({name, description, price, category, pictures});
        console.log('product',product)

        const products = await Product.find();
        res.status(201).json(products);

    }catch(e){ res.status(400).send(e.message) }
})

//  update products  [01:51:39]
router.patch('/:id', async(req,res)=>{  // PATCH method is a request method in HTTP for making partial changes to an existing resource.
    const {id} = req.params;  // extract id from req.params
    try{
        console.log("in the backend patch")
        const {name, description, price, category, images:pictures} = req.body;
        // { find by id and have name, description, price, category, pictures and update
        const product = await Product.findByIdAndUpdate(id,{name, description, price, category, pictures});
        // }
        // { after update send data as json formate to response
        const products =await Product.find();
        res.status(200).json(products);
    }catch (e){ res.status(400).send(e.message); }
})

// delete product
router.delete('/:id', async (req,res)=>{   // use id
    const {id} = req.params;
    const {user_id} = req.body;
    try
    {
        const user = await User.findById(user_id);
        if(!user.isAdmin) return res.status(401).json("You don't have permission");
        await Product.findByIdAndDelete(id);
        const products = await Product.find();
        res.status(200).json(products);
    } catch(e){ res.status(400).send(e.message); }
})

//[3:10:00]
router.get('/:id', async(req,res)=>{
    const {id} = req.params;
    try{
        const product = await Product.findById(id);
        const similar = await Product.find({category:product.category}).limit(5);
        res.status(200).json({product,similar})
    }catch(e){ res.status(400).send(e.message); }
})

// for category [3:28:55]
router.get('/category/:category', async(req,res)=>{
    const {category} = req.params;
    try{
        let products;
        if(category=='all'){
            products = await Product.find().sort([['date',-1]]);
        }
        else{
            products = await Product.find({category})
        }
        res.status(200).json(products)
    }catch(e){ res.status(400).send(e.message); }
})


// +++++++++++++++++++++++++++++++++++++++  for cart routes [3:50:00]+++++++++++++++++++++++

router.post('/add-to-cart', async (req,res)=>{
    const {userId, productId, price} = req.body;
    try{
        const user = await User.findById(userId);
        console.log('modified 1', user)
        const userCart = user.cart;
        // { if product exits in the cart then increase the count
        if(user.cart[productId]){
            userCart[productId]+=1
        }
        else{
            userCart[productId] = 1
        }
        userCart.count+=1;
        // work on price [3:51:20]
        userCart.total=Number(userCart.total) + Number(price);
        user.cart=userCart // set user.cart to new userCart
        user.markModified('cart') // marked that it modified
        await user.save(); // saving the modified user
        console.log('modified', user)
        res.status(200).json(user)  // send back the updated user with the cart
        // }
    }catch(e){ res.status(400).send(e.message); }
})

// +++++++++++++++++++++++++++ for increase cards  [3:52:37]+++++++++++++++++

router.post('/increase-cart', async (req,res)=>{
    const {userId, productId, price} = req.body;
    try{
        const user = await User.findById(userId); // find the user
        const userCart = user.cart; // create the cart
        userCart.total += Number(price)
        userCart.count+=1;
        userCart[productId] +=1
        user.cart=userCart // set user.cart to new userCart
        user.markModified('cart') // marked that it modified
        await user.save(); // saving the modified user
        res.status(200).json(user)  // send back the updated user with the cart
    }catch(e){ res.status(400).send(e.message); }
})

// +++++++++++++++++++++++++++ decrease item from cart [3:53:54] ++++++++++++++

router.post('/decrease-cart', async (req,res)=>{
    const {userId, productId, price} = req.body;
    try{
        const user = await User.findById(userId); // find the user
        const userCart = user.cart; // create the cart
        userCart.total -= Number(price)
        userCart.count-=1;
        userCart[productId] -=1
        user.cart=userCart // set user.cart to new userCart
        user.markModified('cart') // marked that it modified
        await user.save(); // saving the modified user
        res.status(200).json(user)  // send back the updated user with the cart
    }catch(e){ res.status(400).send(e.message); }
})


// +++++++++++++++++++++  remove from cart [3:54:49]++++++++++++++

router.post('/remove-from-cart', async (req,res)=>{
    const {userId, productId, price} = req.body;
    try{
        const user = await User.findById(userId); // find the user
        const userCart = user.cart; // create the cart
        userCart.total -= Number(userCart[productId]) * Number(price) //
        userCart.count-=userCart[productId]; // how many items have in the cart
        delete userCart[productId];  // delete the product with help of product id
        user.cart=userCart // set user.cart to new userCart
        user.markModified('cart') // marked that it modified
        await user.save(); // saving the modified user
        res.status(200).json(user)  // send back the updated user with the cart
    }catch(e){ res.status(400).send(e.message); }
})
module.exports = router;