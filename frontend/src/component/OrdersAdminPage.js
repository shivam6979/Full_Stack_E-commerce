import React, { useEffect, useState } from 'react'
import { Badge, Button, Modal, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from '../axios';
import Loading from "./Loading"



function OrdersAdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const products = useSelector((state)=> state.products);
    const [orderToShow, setOrderToShow] = useState([]);
    const [show, setShow] = useState(false);
    // [06:07:51] error in marked shipped
    function markShipped(orderId, ownerId){
        axios.patch(`/orders/${orderId}/mark-shipped`,{ownerId})
        .then(({data})=>setOrders(data))
        .catch((e)=>console.log(e));
    }


    function handleClose(){
        setShow(false);
    }


    // [06:06:22]
    function showOrder(productsObj){
        let productsToShow = products.filter((product)=> productsObj[product._id]);
        productsToShow = productsToShow.map((product)=>{
            const productCopy = {...product};
            productCopy.count=productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        })
        setShow(true);
        setOrderToShow(productsToShow)
    }

    // [05:57:00]
    useEffect (()=>{
        setLoading(true);
        axios.get("/orders")
        .then(({data})=>{
            setLoading(false);
            setOrders(data)
        })
        .catch((e)=>{
            setLoading(false);
        });
    },[]);
// start from here
    if(loading){
        return <Loading/>
    }
    if(orders.length===0){
        return <h1 className='text-center pt-4'>No order yet</h1>
    }
  return (<>
  <h1>Order admin Page</h1>
    <Table responsive striped bordered hover>
    <thead>
        <tr>
            <th>#</th>
            <th>Client Name</th>
            <th>Items</th>
            <th>Order Total</th>
            <th>Address</th>

        </tr>
    </thead>
    <tbody>
        {orders.map(order=>(
        <tr>
            <td>{order._id}</td>
            <td>{order.owner?.name}</td>
            <td>{order.count}</td>
            <td>${order.total}</td>
            <td>{order.address}</td>
            <td>
                {order.status === "processing" ? (<Button size='sm' onClick={()=>markShipped(order._id, order.owner?._id)}>Mark as shipped</Button>): (<Badge bg="Shipped">Shipped</Badge>)}
            </td>
            <td>
                <span style={{cursor:"pointer"}} onClick={()=> showOrder(order.products)}>
                    View order <i className='fa fa-eye'></i>
                </span>
            </td>
        </tr>))}
    </tbody>
</Table>
<Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
    <Modal.Title>Order details</Modal.Title>
    </Modal.Header>
    {orderToShow.map(order=>(
        <div className='order-details__container d-flex justify-content-around py-2'>
            <img src={order.pictures[0].url} style={{maxWidth:100, height:100, objectFit:"cover"}}/>
            <p>
                <span>{order.count} x</span>{order.name}
            </p>
            <p>Price: ${Number(order.price)*order.count}</p>
        </div>
    ))}
    <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>Close</Button>
    </Modal.Footer>
</Modal>
</>
  )
}
export default OrdersAdminPage