// created at [3:36:54]
//  used to process (payments, ...)
import React, { useState } from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { Alert, Container,Row, Col,Table } from 'react-bootstrap';
import {useSelector} from 'react-redux';//useSelector() ​ Allows you to extract data from the Redux store state, using a selector function.
    // [04:16:34]
import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation, useAddToCartMutation  } from '../services/appApi'
import './CartPage.css'
import CheckoutForm from '../component/CheckoutForm';

// creating stripe promise
const stripePromise = loadStripe("pk_test_51MZWeCSJYaxiAQdQkRZJHRK3RH45M4W6CTyqluFw1kuwMIyXO6FQ5RjcsqmfgUHPSW0EE69RmvXQgWTt3BsdZiiT007E5PWl0Q")


function CartPage() {
    const user = useSelector(state=>state.user);
    const products = useSelector(state=>state.products);
    const userCartObj = user.cart;
    // console.log('user.cart------------------',user.cart)

    // [3:38:25]
    let cart = products.filter((product)=> userCartObj[product._id] != null);
    // [04:16:38]
    const [increaseCart] = useIncreaseCartProductMutation();
    const [ decreaseCart] = useDecreaseCartProductMutation();
    const [ removeFromCart,{isLoading}] =useRemoveFromCartMutation();

    // [ functon for handelling the decreaseing the item 04:17:30]
    function handleDecrease (product){
        // console.log("product------------- ", product)
        const quantity = user.cart.count;
        // console.log('quantity',quantity)
        if(quantity <=0) return alert('No item to remove');
        decreaseCart(product)
    }




    return (
        <Container style={{minHeight:'95vh'}} className='cart-container'>
            <Row>
                <Col md={7}>
                    <h1 className='pt-2 h3'>Shopping cart</h1>
                    {cart.length ===0 ?(
                        <Alert variant='info'> Cart is Empty. Add Product to your cart</Alert>
                    ):(
                        // <div></div>
                        // [04:29:32]
                        <Elements stripe={stripePromise}>
                             <CheckoutForm/>
                         </Elements>
                    )}
                </Col>
                {/* Table in cart to show product details  [04:08:00] */}
                <Col md={5}>
                    {cart.length>0 && (
                        <>
                            <Table responsive='sm' className='cart-table'>
                                <thead>
                                    <tr>
                                        {/* &nbsp; A non-breaking space is a space that will not break into a new line. */}
                                        {/*  <th> tag defines a header cell in an HTML table, elements are bold and centered by default.  */}
                                        <th>&nbsp;</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {/* loop through cart products [04:09:00] */}
                                {cart.map(item=>(
                                    <tr>
                                        {/* The <td> tag defines a standard data cell in an HTML table, elements are regular and left-aligned by default. */}
                                        <td>&nbsp;</td>
                                        <td>
                                            {/* icon for remove item from the cart { onClick->[04:22:38]}*/}
                                            {!isLoading &&<i className='fa fa-times' style={{marginRight:10, cursor:'pointer'}} onClick={()=>removeFromCart({productId: item._id, price:item.price, userId: user._id})}></i>}
                                            {/* for showing the item in the icon side in the cart */}
                                            <img src={item.pictures[0].url} style={{width:100, height:100, objectFit:'cover'}}></img>
                                        </td>
                                        <td>${item.price}</td>

                                        <td>
                                           <span className='quantity-indicator'>
                                            {/* correction at [04:21:03] */}
                                                <i className='fa fa-minus-circle' onClick={() => handleDecrease({productId:item._id, price:item.price, userId:user._id})}></i>{/*
                                                 need to match what is required by the function   */}

                                                {/* show the number of item in the cart [04:13:38]  */}
                                                <span>{user.cart[item._id]}</span>
                                                <i className='fa fa-plus-circle' onClick={()=> increaseCart({ productId:item._id, price:item.price, userId:user._id})}></i>
                                           </span>
                                        </td>
                                        {/*  having subtotal  04:12:16 */}
                                        <td>${item.price * user.cart[item._id]}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            {/* showing total price [04:12:40] */}
                            <div>
                                <h3 className='h4 pt-4'>Total: ${user.cart.total}</h3>
                                {/* {console.log('user.cart.total',user.cart.total)} */}
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
  )
}

export default CartPage

