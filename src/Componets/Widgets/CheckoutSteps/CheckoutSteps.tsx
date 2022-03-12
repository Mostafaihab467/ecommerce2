import React from 'react'
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Image, Button, ListGroup, Form, Card, Nav } from 'react-bootstrap'
import DONE from '../../../assets/images/Done.png'
import './CheckoutSteps.scss'

interface CheckoutStpes {
  step1: boolean,
  step2: boolean,
  step3: boolean,
  step4: boolean,
}

const CheckoutSteps = ({ step1, step2, step3, step4 }: CheckoutStpes) => {
  return (
    <div>
      <Nav className='justify-content-center mb-4'>
        <Nav.Item>
          {step1 ? <div className='done'>
            <img src={DONE} /> <Nav.Link  href='../login' >Signed</Nav.Link>  </div> :

            <Nav.Link disabled className='navLink' >Sign In</Nav.Link>

          }
        </Nav.Item>

        <Nav.Item>
          {step2 ? <div className='done'>
            <img src={DONE} /> <Nav.Link href='../shipping'>Shipping</Nav.Link>  </div> :

            <Nav.Link disabled>Shipping</Nav.Link>

          }
        </Nav.Item>



        <Nav.Item>
          {step3 ? <div className='done'>
            <img src={DONE} /> <Nav.Link href='../payment'>Payment</Nav.Link> </div> :

            <Nav.Link disabled>Payment</Nav.Link>

          }
        </Nav.Item>


        <Nav.Item>
          {step4 ? <div className='done'>
            <img src={DONE} /> <Nav.Link href='../placeOrder'>Place Order</Nav.Link> </div> :

            <Nav.Link disabled>Place Order</Nav.Link>

          }
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default CheckoutSteps