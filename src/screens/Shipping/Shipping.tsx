import React, { useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Image, ListGroup, Container, Card, Button, Form, ListGroupItem } from 'react-bootstrap';
import './Shipping.scss'
import { C_Shipping } from '../../Models/ShppingModel';
import { Add_Shipping_Address } from '../../store/Action/cartAction';
import CheckoutSteps from '../../Componets/Widgets/CheckoutSteps/CheckoutSteps';
function Shipping() {

    const nav = useNavigate()
    const [address, setAdress] = useState('')
    const [city, setcity] = useState('')
    const [postalCode, setpostalCode] = useState('')
    const [country, setcCuntry] = useState('')
    const isShipping = useSelector((state: any) => state.cartRepo.Shipping_Address.address) != ''
    const dispatch = useDispatch()


    const handleSubmit = () => {
        const shippingAddress = new C_Shipping(city,address,postalCode,country)

       dispatch(Add_Shipping_Address(shippingAddress))
        nav('../payment') 
      
    }

    return (
        <Row className='Main_Container'>
            <CheckoutSteps  step1={true}  step2={true} step3={isShipping} step4={false}/>
            <Col md={5}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='name'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type='address' placeholder='Enter Address' value={address} required onChange={(e)=>setAdress(e.target.value)}></Form.Control>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='city' placeholder='Enter city' value={city} required onChange={(e)=>setcity(e.target.value)}></Form.Control>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type='postalCode' placeholder='Enter postalCode' value={postalCode} required onChange={(e)=>setpostalCode(e.target.value)}></Form.Control>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type='country' placeholder='Enter country' value={country} required onChange={(e)=>setcCuntry(e.target.value)}></Form.Control>
                        <div className='bt_div'><Button  type='submit' variant='primary'>Continue</Button></div>
                
                    </Form.Group>
                
                    <Row>Shipping</Row>
                </Form>
            </Col>
        </Row>
    )
}

export default Shipping

function ADD_SHIPPING_ADDRESS(): any {
    throw new Error('Function not implemented.');
}
