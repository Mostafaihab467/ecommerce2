import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Image, Button, ListGroup, Form, Card, Nav } from 'react-bootstrap'
import CheckoutSteps from '../../Componets/Widgets/CheckoutSteps/CheckoutSteps';
import { IShiiping } from './../../Models/ShppingModel';
import './PaymentScreen.scss'
import { setPayment } from '../../store/Action/paymentAction';

function Payment() {
  const nav = useNavigate()
  const shipping = useSelector((state:any)=>state.cartRepo.Shipping_Address) as IShiiping
  const [paymentMehod,setPaymentMethod] = useState('')
  const dispatch = useDispatch()


 const handleChange=(e:any)=>{
  e.preventDefault()
  dispatch(setPayment(paymentMehod))
  nav('../placeOrder')
 }

  return (
    <div >

      <CheckoutSteps step1={true}  step2={true} step3={paymentMehod=='' ? false : true} step4={false}/>
      <div className='payment_div'>
   
        <Col md={8}>
        <h2>Payment Method</h2>
          <Form onSubmit={handleChange} >
              <Form.Group>
              <h5><Form.Label>Select Method</Form.Label></h5>
              </Form.Group>
              <Col md={8}>
               <Form.Check className='FormCheck' label='PayPal or Credit Card' id='PayPal' type='radio' name='paymentMehod' value={'PayPal'} onChange={(e)=>setPaymentMethod(e.target.value)} > 
               </Form.Check>
              
               <Form.Check className='FormCheck' label='Stripe' id='Stripe' type='radio' name='paymentMehod' value={'Stripe'} onChange={(e)=>setPaymentMethod(e.target.value)} >
                 
                 </Form.Check>
             
                <div className='bt_submit'><Button  type='submit' variant='primary'>Continue</Button></div>
                </Col>
          
          </Form>
        </Col>
        </div>
     
    </div>
  )
}

export default Payment