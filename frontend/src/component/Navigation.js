import React from 'react'
import {Navbar, Nav, NavDropdown, Container, Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../features/userSlice';
import CartPage from '../pages/CartPage';
import './Navigation.css'


function Navigation() {
const user = useSelector((state) => state.user)  // selector comming from react redux & give access to the state
const dispatch = useDispatch();
function handleLogout(){
  console.log('user.cart.count',user.cart.count)
  dispatch(logout());
}

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to=''>
        <Navbar.Brand>Ecomern</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {/* if there is no user */}
            {!user && (<LinkContainer to='/login'><Nav.Link>Login</Nav.Link></LinkContainer>)}

            {/* Adding icon for navigation [3:41:55]  */}
            {user && !user.isAdmin &&(
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>

                  {/* adding icon if user has product in cart */}
                    { user?.cart.count >0 && (
                      <span className='badge badge-warning' id='cartcount'>{user.cart.count}</span>
                    ) }
                </Nav.Link>
              </LinkContainer>
            )}

            {/* if we have an user */}
            {user &&(
            <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">

              {user.isAdmin && (<>
                <LinkContainer to='/admin'><NavDropdown.Item>Dashboard</NavDropdown.Item></LinkContainer>
                <LinkContainer to='/new-product'><NavDropdown.Item>Create Product</NavDropdown.Item></LinkContainer>
              </>)}
              {!user.isAdmin && (// not admin
                <>
                <LinkContainer to='/cart'><NavDropdown.Item>Cart</NavDropdown.Item></LinkContainer>
                <LinkContainer to='/orders'><NavDropdown.Item>My Orders</NavDropdown.Item></LinkContainer>
                </>
              )}
              <NavDropdown.Divider/>
                <Button variant='danger' onClick={handleLogout} className='logout-btn'>Logout</Button>
            </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  }
  export default Navigation

