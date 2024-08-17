import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Image, Button, ListGroup, Form, Card, Nav, ListGroupItem } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import './OrderScreen.scss'
import { ICartItem } from '../../Models/CartItem';
import { IShiiping } from '../../Models/ShppingModel';
import CheckoutSteps from '../../Componets/Widgets/CheckoutSteps/CheckoutSteps';
import { IOrder } from './../../Models/OrderModel';
import { IUserModel } from './../../Models/userModel';
import Message from '../../Componets/Widgets/Message/Message';
import { AddOrder, PayOrder } from '../../store/Action/orderAction';
import { PayPalButton } from "react-paypal-button-v2";
function OrderScreen() {



    const [sdkReady, setSDKReady] = useState(false)
 
    const [items, setItems] = useState(0)

    const [tax, setTax] = useState(0)

    const Shipping = useSelector((state: any) => state.cartRepo.Shipping_Address) as IShiiping
    const user = useSelector((state: any) => state.user.user) as IUserModel
    const Currentorder = useSelector((state: any) => state.order.CurrentOrder) as IOrder
    const Orders = useSelector((state: any) => state.order.Orders) 
    const [total, setTotal] = useState(1)
    const dispatch = useDispatch()
    const CaclulateSummary = async () => {

        setItems(Number(Currentorder.Order.reduce((acc,item)=>
     acc+ Number(item.qty)*Number(item.cartItem.price),0).toFixed(2)))
        
    }


    const paypal = async () => {
      
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=AV39og7w79KneZhBoOYIX_Vymmfc-82lvZHWA46VsyR4ePEV_9hIrtwNz87Yy_9LymVM5ZipYnkaOfmA`
        script.async = true
        script.onload = () => {
            setSDKReady(true)
        }
        document.body.append(script)
    }

    useEffect(() => {

        CaclulateSummary()
        paypal()
 
    }, [])

    const a7a = () => {
        alert(total)
        return total
    }

    return (
        <div>

            <Row>
                {Orders.map((e:any)=>{})}
                <CheckoutSteps step1={true} step2={true} step3={false} step4={Currentorder.isPaid} />
                <Col md={8}>
                    <h2>Order :{Currentorder._id}</h2>
                    <ListGroup>
                        <div className='listItem'>
                            <ListGroupItem>
                                <h3>Shipping</h3>
                                <div className='shiiping_item'><span>Name : {user.name}</span></div>
                                <div className='shiiping_item'><span>email : {user.email}</span></div>
                                <div className='shiiping_item'><span> Address: {Shipping.country}  {Shipping.city} {Shipping.postalCode}
                                    {Shipping.address} </span></div>
                            </ListGroupItem>
                        </div>
                        <div className='listItem'>
                            <ListGroupItem>
                                <h3>Payment Mehod</h3>
                                <div className='payment_method'>  <span> Method : {Currentorder.paymentMethod}</span>
                                    <p>{Currentorder.isPaid ? <Message error={false} message={`Paid On ${new Date(Currentorder.paidAt).toString().split('GMT')[0]}`} /> :
                                        <Message error={true} message='Not Paid' />} </p>
                                </div>

                            </ListGroupItem>
                        </div>
                        <div className='listItem'>
                            <ListGroupItem>
                                <h3>Order Items</h3>



                                {Currentorder.Order.map((product: ICartItem) => {
                                    const { image, name, price } = product.cartItem
                                    return <div className='itemsInCart'>
                                        <Row md={10}>
                                            <Col md={2}>
                                                <Image fluid src={image} />

                                            </Col>
                                            <Col md={6}>
                                                {name}
                                            </Col>
                                            <Col md={4}>
                                                <div className='total_ItemPrice'>${Number(price)}x{product.qty} = ${(Number(price) * product.qty).toFixed(2)}</div>
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
                                    <span>${20}</span>
                                </div >

                            </ListGroupItem>
                            <ListGroupItem>
                                <div className='detail_summary'><span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>

                            </ListGroupItem>
                            <ListGroupItem>
                                <div className='detail_summary'><span>Total:</span>
                                    ${Currentorder.totalPrice.toFixed(2)}
                                </div>
                            </ListGroupItem>

                        </ListGroup>
                        {/* {total>0 ? alert(total) : alert(total)} */}


                        <PayPalButton

                            amount={Number(Currentorder.totalPrice) == 0 ? 1 : Number(Currentorder.totalPrice).toFixed(2) }
                            onError={(e: any) => { alert(e) }}
                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                            onSuccess={(details: any, data: any) => {
                                // alert("Transaction completed by " + user.email);
                                dispatch(PayOrder(Currentorder._id))
                                // OPTIONAL: Call your server to save the transaction
                                return fetch("/paypal-transaction-complete", {
                                    method: "post",
                                    body: JSON.stringify({
                                        orderID: data.orderID
                                    })
                                });
                            }}
                        />
                        <Button onClick={() => {
                            dispatch(PayOrder(Currentorder._id))
                        }} >Pay Now</Button>
                    </div>
                </Col>

            </Row>

        </div>
    )
}

export default OrderScreen