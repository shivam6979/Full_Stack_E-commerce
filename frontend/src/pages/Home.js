import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import categories from '../Categories/categories'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import {updateProducts} from '../features/productSlice'
import ProductPreview from '../component/ProductPreview'
import axios from '../axios'


function Home() {
  const dispatch = useDispatch();  // useDispatch() is a hook that returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
  const products = useSelector(state => state.products); // When an action is dispatched, useSelector() will do a reference comparison of the previous selector result value and the current result value.
  const lastProducts = products.slice(0,8);

  useEffect(()=>{ // fetch the data
    axios.get('/products').then(({data})=> dispatch(updateProducts(data)))
  },[]);

  return (
    <div>
      <img src="https://res.cloudinary.com/djguiefro/image/upload/v1671955654/banner_xqchhm.png"/>
      <div className="feature-products-container container mt-4">
        <h2>Last products</h2>
        {/* last product here */}
        <div className='d-flex justify-content-center flex-wrap'>
        {lastProducts.map((product)=>(
          <ProductPreview {...product}/>//returing a component form component/ProductPreview.js
        ))}
        </div>

        <div>

        <Link to="/category/all" style={{textAlign:"right", display:"bold", TextDecoder:"none"}}>See more{">>"}
        </Link>
        </div>
      </div>
      {/* sale banner */}
    <div className="sale__banner--container mt-4">
      <img src="https://cdn.pixabay.com/photo/2021/09/12/07/58/banner-6617550_1280.png"/>
    </div>
    <div className='recent-product-container container mt-4'>
      <h2>Categories</h2>
      <Row>
        {categories.map((category)=>(
          <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
          <Col md={4}>
          <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.img})`, gap:'10px'}} className='category-title'>{category.name}

          </div>
          </Col>
          </LinkContainer>
        ))}
      </Row>
    </div>

    </div>
  )
}

export default Home