import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Image, Button, ListGroup, Form, Card, Nav, ListGroupItem } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import './PlaceOrderScreen.scss'
import CheckoutSteps from '../../Componets/Widgets/CheckoutSteps/CheckoutSteps';
import { ICartItem } from '../../Models/CartItem';
import { IShiiping } from './../../Models/ShppingModel';
import { AddOrder } from '../../store/Action/orderAction';
import { C_Order } from '../../Models/OrderModel';
import { CLEAR_CART, CLEAR_MY_CART } from '../../store/Action/cartAction';
function PlaceOrderScreen() {
    const paymentMehod = useSelector((state: any) => state.payment.paymentMethod)
    const myCarts = useSelector((state: any) => state.cartRepo.MyCart) as ICartItem[]
    const [items,setItems] = useState(0)
    const [shipping,setShipping] = useState(0)
    const [tax,setTax] = useState(0)
    const [total,setTotal] = useState(0)
    const Shipping = useSelector((state: any) => state.cartRepo.Shipping_Address) as IShiiping
    const dispatch = useDispatch()
    const nav = useNavigate()
    const CaclulateSummary=()=>{
  
        setItems(Number(myCarts.reduce((acc,item)=>acc+item.cartItem.price,0).toFixed(2)))
        setShipping(9)
        setTax((0.12*items))
        setTotal(items+shipping+tax)

    }

    useEffect(()=>{
        CaclulateSummary()
    })


    const handleSubmit=()=>{
    
        dispatch(AddOrder(new C_Order(myCarts,paymentMehod,Shipping,total,shipping,false,0)))
        dispatch(CLEAR_MY_CART())
        nav('../../OrderScreen')
    }

    return (


        <div>
            <Row>
                <CheckoutSteps step1={true} step2={true} step3={false} step4={false} />
                <Col md={8}>

                    <ListGroup>
                        <div className='listItem'>
                            <ListGroupItem>
                                <h3>Shipping</h3>
                                <h5>{Shipping.country}  {Shipping.city} {Shipping.postalCode} {Shipping.address} </h5>
                            </ListGroupItem>
                        </div>
                        <div className='listItem'>
                        <ListGroupItem>
                            <h3>Payment Mehod</h3>
                            <h5> Method : {paymentMehod}</h5>
                        </ListGroupItem>
                        </div>
                        <div className='listItem'>
                        <ListGroupItem>
                            <h3>Order Items</h3>

                            {myCarts.map((product: ICartItem) => {
                                const {image,name,price} = product.cartItem
                                return <div className='itemsInCart'>
                                    <Row md={10}>
                                        <Col md={2}>
                                            <Image fluid src={product.cartItem.image} />
                                         
                                        </Col>
                                        <Col md={6}>
                                            {name}
                                        </Col>
                                        <Col md={4}>
                                            <div className='total_ItemPrice'>${price}x{product.qty} = ${(price*product.qty).toFixed(2)}</div>
                                        </Col>
                                    </Row>
                                </div>
                            })}

                        </ListGroupItem>
                        </div>
                    </ListGroup>


                </Col>
             
                    <Col md={4}>
                    <div className='Order_Summary'>
                    <ListGroup>
                        <ListGroupItem>
                            <h3>Order Summary</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                    
                        <div className='detail_summary'><span>items</span>
                         <span>${items.toFixed(2)}</span>
                        </div>
                        </ListGroupItem>
                        <ListGroupItem>
                        <div className='detail_summary'><span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                        </div >
                    
                        </ListGroupItem>
                        <ListGroupItem>
                        <div className='detail_summary'><span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                        </div>
                       
                        </ListGroupItem>
                        <ListGroupItem>
                        <div className='detail_summary'><span>Total</span>
                        ${total.toFixed(2)}
                        </div>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Button onClick={()=>handleSubmit()} style={{width:'100%'}}  variant='primary'>Place Order</Button>
                        </ListGroupItem>
                        </ListGroup>
                        </div>
                        </Col>
          
            </Row>
           
        </div>
    )
}

export default PlaceOrderScreen