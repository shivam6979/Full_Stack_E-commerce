import React, { useState } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom'
import {Container, Row, Col, Form, Button, Alert, } from 'react-bootstrap'
import {useLoginMutation} from '../services/appApi'

function Login() {
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [login, {isError, isLoading, isSuccess, error}] = useLoginMutation();

    function handleLogin(e){
        e.preventDefault();
        login({email, password})
    }

  return (
    <Container>
    <Row>
        <Col md={6} className="login__form--container">
            <Form style={{width:'100'}} onSubmit={handleLogin}>
                <h1>Login to your account</h1>
                {isError && <Alert variant='danger'>{error.data}</Alert>}
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                 <Button type="submit" disabled={isLoading}>Login</Button>
                </Form.Group>
                <p>don't have account?<Link to="/signup">Create account</Link></p>


            </Form>
        </Col>
        <Col md={6} className="signup__image--container"></Col>

    </Row>
</Container>  )
}
export default Login
