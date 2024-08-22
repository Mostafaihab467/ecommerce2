import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListGroup, Row, Col, Button, Form, Container, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../../store/Action/userAction';
import { IUserModel } from '../../Models/userModel';

import { SET_REDIRECT_PATH } from '../../store/Action/RouterAction';


function LoginScreen() {
    const nav = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const isLogged = useSelector((state: any) => state.user.user.token) != ''
    const redirectLink = useSelector((state: any) => state.redirection.redirect) as string
    const dispatch = useDispatch()
    const submitButton = (e: any) => {
        e.preventDefault()
      
        const user = {
            email: email,
            password: password,
            name: ""
        } as IUserModel
        dispatch(Login(user))
        if( redirectLink !='../../'){
            nav(redirectLink)
            dispatch(SET_REDIRECT_PATH('../../'))
        }
    
    }

 //   isLogged ? nav('../../') : null

    return (
        <div>
            <Row ><h1>SignIn</h1>
                <Col md={7} >
                    <Form onSubmit={submitButton}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>


                        <Form.Group controlId='password'>
                            <Form.Label>Password </Form.Label>
                            <Form.Control type='password' placeholder='passwod' value={password} onChange={(e) => setpassword(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button  type='submit' variant='primary' >Sign In</Button>
                    </Form>

                    <Row className='py-3'>
                        <Col>New Customer? <Link to='../register'>Register</Link></Col>
                    </Row>
                </Col>
                <Col md={5}>
                    <h4>Welcome To Pro Shop</h4>
                    <ListGroup>
                        <ListGroupItem>
                            Google Login
                        </ListGroupItem>

                        {/* <ListGroupItem>
                            <FacebookLogin
                                size='small'
                                appId="1088597931155576"
                                autoLoad={false}
                                fields="name,email,picture"
                                onClick={() => { }}
                                callback={() => { }}
                                icon="fa-facebook"
                            />
                        </ListGroupItem> */}
                    </ListGroup>
                </Col>
            </Row>

        </div>
    )
}

export default LoginScreen