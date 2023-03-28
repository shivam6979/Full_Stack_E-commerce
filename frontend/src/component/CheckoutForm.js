// [04:29:50]
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Alert, Button, Col, Form, Row} from 'react-bootstrap'
import { useCreateOrderMutation } from '../services/appApi';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector(state=>state.user);
    const navigate = useNavigate();
    const [ alertMessage, setAlertMessage] = useState("");
    const [createOrder, {isLoading, isError, isSuccess}] = useCreateOrderMutation();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("")
    const [paying, setPaying] = useState(false);


    //Function for handle the pay [04:41:25]
    async  function handlePay(e){
        e.preventDefault();
        console.log("before navigate1")
// if there are no stripe objects or elements
        if(!stripe || !elements || user.cart.count<=0) return;
        setPaying(true);
        // [04:41:50]
        const {client_secret} = await fetch("http://localhost:8000/create-payment",{// used in server.js
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({amount:user.cart.total}),
        }).then((res)=>res.json());
        console.log("before navigate2")
        console.log(client_secret)
        // [04:43:54]
        const {paymentIntent} = await stripe.confirmCardPayment(client_secret,{
            payment_method:{
                card:elements.getElement(CardElement),
            },
        });
        console.log(paymentIntent)
        console.log("before navigate3")
        setPaying(false);
        if(paymentIntent){
            createOrder({userId:user._id,cart:user.cart,address, country})
            console.log("before navigate4")
            .then(res=>{
                console.log("before navigate5")
                if(!isLoading || !isError){
                    console.log("before navigate6")
                    setAlertMessage(`Payment ${paymentIntent.status}`);
                    console.log("before navigate7")
                    setTimeout(()=>{
                        console.log("after navigate8")
                        navigate("/orders")
                        console.log("after navigate9")
                    },2000);
                }
            })
        }
        console.log("After if")
    }

  return (
    <Col md={7} className='cart-payment-contain'>
        <Form onSubmit={handlePay}>
            <Row>
                {alertMessage && <Alert>{alertMessage}</Alert>}
            <Col md={6}>
                <Form.Group className='mb-3'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type='text' placeholder='First Name' value={user.name} disabled/>
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='text' placeholder='Email' value={user.email} disabled/>
                </Form.Group>
            </Col>
            </Row>

            <Row>
            <Col md={7}>
                <Form.Group className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='address' value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                </Form.Group>
            </Col>

            <Col md={5}>
                <Form.Group className='mb-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='country' value={country} onChange={(e)=>setCountry(e.target.value)} required/>
                </Form.Group>
            </Col>

            </Row>
            <label htmlFor='card-element'>Card</label>
            <CardElement id='card-element'/>
            <Button className='mt-3' type='submit' disabled={user.cart.count<=0 || paying || isSuccess}>{paying ? 'Processing....':"Pay" }</Button>

        </Form>
    </Col>
    )
}

export default CheckoutForm