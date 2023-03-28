// import { height } from '@mui/system';
import React,{useState} from 'react'
import { Alert, Form, Col, Container, Row, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { useCreateProductMutation } from '../services/appApi';
import axios from '../axios'
import './NewProduct.css'


function NewProduct(){
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();

  // add hook
  const [createProduct,{isError, error, isLoading, isSuccess}]=useCreateProductMutation(); //  useCreateProductMutation is a hook

// -----------------------------------------------------------------------------------------------
// function for removing element
function handleRemoveImg(imgObj){
  setImgToRemove(imgObj.public_id);
  axios.delete(`/images/${imgObj.public_id}/`).then((res)=>{ // axios send request to backend
    setImgToRemove(null);
    setImages((prev)=> prev.filter((img)=> img.public_id !== imgObj.public_id));
    console.log("remove Image")

  }).catch((e)=> console.log(e));
}

// -----------------------------------------------------------------------------------------------
// function for submit or creating the product;[2: 30:00]
function handleSubmit(e){
  e.preventDefault();    // used to prevent the browser from executing the default action of the selected element.

  if(!name || !description || !price || !category || !images.length){
    return alert('Please fill out all the fields');
  }
  createProduct({name, description, price, category, images}).then( ({data})=>{ // issue in data solve it asap
    if(data.length>0){
      console.log("data.length",data.length)
      setTimeout(()=>{  // setTimeout used only for showing the users that the product is created
        navigate("/");
      }, 1500);
    }
  }).catch((e)=> console.log(e));
}

// -----------------------------------------------------------------------------------------------
  // add or upload image to widget from cloudinary for storage files.
  function showWidget(){
    const widget= window.cloudinary.createUploadWidget(
      {
        cloudName:'djguiefro',
        uploadPreset:'fz1sjhdc',
      },
      (error, result)=>{
        if(!error && result.event ==="success"){
          setImages((prev)=>[...prev,{url:result.info.url, public_id:result.info.public_id}])
        }
      }
    );
    widget.open();
    console.log("show image")

  }

// -----------------------------------------------------------------------------------------------
  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
        <Form style={{width:'100%'}} onSubmit={handleSubmit}>
                <h1 className='mt-4'>Create a product</h1>
                {isSuccess && <Alert variant="success">Product is created with success</Alert>}
                {isError && <Alert variant='danger'>{error.data}</Alert>}
                <Form.Group className='mb-3'>
                    <Form.Label>Product name</Form.Label>
                    <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Product description</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter product description" style={{height:'100px'}} value={description} required onChange={(e)=>setDescription(e.target.value)}/>
                </Form.Group>


                <Form.Group className='mb-3'>
                    <Form.Label>price($)</Form.Label>
                    <Form.Control type="number" placeholder="Price ($)" value={price} required onChange={(e)=>setPrice(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-3' onChange={(e)=>setCategory(e.target.value)}>
                    <Form.Label>Category</Form.Label>
                    <Form.Select>
                      <option disabled selected> == Select One == </option>
                      <option value='technology'>technology</option>
                      <option value='tablets'>tablets</option>
                      <option value='phones'>phones</option>
                      <option value='laptops'>laptops</option>
                      </Form.Select>
                </Form.Group>

{/* Uploading the Images  */}
                <Form.Group className='mb-3'>
                  <Button type='button' onClick={showWidget}>Upload Images</Button>
                  <div className='images-preview-container'>
                    {/* 2:11:34 */}
                    {images.map((image)=>(
                      <div className='images-preview'>
                        <img src={image.url}/>

                        {/*add items for removing  {(imgToRemove != image.public_id) this will remove the cross icon once clicked }*/}
                        {imgToRemove !== image.public_id && <i className='fa fa-times-circle' onClick={()=>handleRemoveImg(image)}></i>}
                      </div>
                    ))}
                  </div>
                </Form.Group>

                <Form.Group><Button type="submit" disabled={isLoading || isSuccess}>Create Product</Button></Form.Group>
            </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  )
}
export default NewProduct;

