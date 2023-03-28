// at 3:20:10

import React, { useEffect, useState } from 'react'
import {Col, Container,Row} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from '../axios';
import ProductPreview from '../component/ProductPreview';
import Loading from '../component/Loading';
import './CategoryPage.css'

function CategoryPage(){
    const {category} = useParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // showing this at [3:23:38]
    useEffect(()=>{
        setLoading(true);  // fetch the data by set loading
        axios.get(`/products/category/${category}`).then(({data})=>{
            setLoading(false);
            setProducts(data);
        })
        .catch((e)=>{
            setLoading(false);
            console.log(e.message)
        })
    },[category]);


// 3:23:37
    if(loading){
        <Loading/>  //return loading component
    }

// 3:24:10
const productsSearch = products.filter((product)=>  // apear every time you type something
    product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return(
    <div className='category-page-container'>
        <div className={`pt-3 ${category}-banner-container category-banner-container`}>
            {/* making first letter of category capital */}
            <h1 className='text-center'>{category.charAt(0).toUpperCase()+category.slice(1)}</h1>
        </div>
        <div className='filters-container d-flex justify-content-center pt-4 pb-4'>
            <input type='search' placeholder='Search' onChange={(e)=>setSearchTerm(e.target.value)} />
        </div>
        {productsSearch.length ===0 ?
        (<h1>No products to Show</h1>
        ): (<Container>
                <Row>
                    <Col md={{span:10, offset:1}}>
                        <div className='d-flex justify-content-center align-items-center flex-wrap'>
                        {productsSearch.map((product)=>(
                            <ProductPreview {...product}/>
                        ))}
                        </div>

                    </Col>
                </Row>
            </Container>
        )}
    </div>




  )
}

export default CategoryPage