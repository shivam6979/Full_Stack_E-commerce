//  showcasing the product details

import axios from '../axios';
import React, {useState, useEffect} from 'react';
import AliceCarousel from 'react-alice-carousel';
import {Container, Row, Col, ButtonGroup, Form, Button} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Loading from '../component/Loading';
import SimilarProduct from '../component/SimilarProduct';
import {Badge, Card } from 'react-bootstrap';
import './ProductPage.css'
import { LinkContainer } from 'react-router-bootstrap';
import 'react-alice-carousel/lib/alice-carousel.css'
import { useAddToCartMutation } from '../services/appApi';
import ToastMessage from '../component/ToastMessage';

function ProductPage(){
    const {id} = useParams(); // grab the id and (useParams() hook is a React Router hook that allows you to access the parameters of the current URL. )
    const user = useSelector(state=>state.user);
    const [product,setProduct] = useState(null);
    const [similar,setSimilar] = useState(null);
    // [3:47:43]
    const [addToCart,{ isSuccess }] = useAddToCartMutation();

    // 3:05:50 to see this code
    const handleDragStart = (e) => e.preventDefault();
    useEffect(()=>{
        axios.get(`/products/${id}`).then(({data})=>{
            setProduct(data.product);
            setSimilar(data.similar);
        })
    },[id]) // id added as a dependency here
    if(!product){
        return <Loading/>  // pages/Loading.js
    }
    // making the page responsive show the number of items on the page dimension
    const responsive = {
        0:{items:1},
        568:{items:2},
        1024:{items:3}
    }
    const images = product.pictures.map((picture)=>
    <img className='product__carousel--image' src={picture.url} onDragStart={handleDragStart}/>)

// 3:03:00
    let similarProducts = [];
    if(similar){
        similarProducts = similar.map((product,idx)=>(
            <div className='item' data-value={idx}>
                 <SimilarProduct {...product}/>  {/* in component/SimilarProduct*/}
            </div>
        ))
    }
    return (
    <Container className = 'pt-4' style={{position:'relative'}}>
        <Row>
            <Col lg={6}>
                <AliceCarousel mouseTracking items={images} controlsStrategy='alternate'/>
            </Col>
            <Col lg={6} className='pt-4'>
                <h1>{product.name}</h1>
                <p> <Badge bg='primary'>{product.category}</Badge> </p>
                <p className='product__price'>${product.price}</p>
                <p style={{textAlign:'justify'}} className='py-3'>
                    <strong>Description:</strong>{product.description}
                </p>
                {/* 3:12:30 */}
                {user && !user.isAdmin && (
                    <ButtonGroup style={{width:'90%'}}>
                        <Form.Select size='lg' style={{width:'40%', borderRadius:'0'}}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </Form.Select>
                        {/* addToCart function */}
                        <Button size='lg' onClick={()=> addToCart({userId:user._id, productId:id, price:product.price, image:product.pictures[0].url})}>Add to cart</Button>
                    </ButtonGroup>
                )}
                {/* if user is Admin [3:15:37] */}
            {user && user.isAdmin &&(
                <LinkContainer to={`/product/${product._id}/edit`}>
                    <Button size='lg'>Edit Product</Button>
                </LinkContainer>
            )}
            {isSuccess && <ToastMessage bg='info' title='Add to cart ' body={`${product.name} is in your cart`}/>}
            </Col>
        </Row>
        {/* for similar product [3:16:37] */}
        <div className='my-4'>
            <h2>Similar Products</h2>
            <div className='d-flex justify-content-center align-items-center flex-wrap'>
                <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy='alternate'/>
            </div>
        </div>
    </Container>
  )
}

export default ProductPage