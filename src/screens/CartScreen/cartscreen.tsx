import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Image, Button, ListGroup, Form, Card } from 'react-bootstrap'
import { ICartItem } from '../../Models/CartItem';
import { ProductModel } from './../../Models/ProductModel';

import './CartScreen.scss'
import { QTY } from '../Product/ProductScreen';
import { Add_toCart, DELETE_FROM_CART } from '../../store/Action/cartAction';

function Cartscreen(props: any) {
  const dispatch = useDispatch()
  const myCarts = useSelector((state: any) => state.cartRepo.MyCart) as ICartItem[]
  const nav = useNavigate()
  useEffect(() => {

  }, [])

  const handleOrder = () => {


  }

  return (
    <div>

      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {myCarts.length < 0 ? <> <h1>Your Cart is Empty</h1>
            <Link to={'/'}>Go Back</Link> </> :
            <ListGroup variant='flush'>
              {myCarts.map((product: ICartItem) => {
                const { image, _id, brand, category, price, rating, numReviews, name } = product.cartItem
                return <ListGroup.Item key={_id} variant='flush'>
                  <Row>
                    <Col md={2}>
                      <Image src={require(`../../assets/images/${image}`)} fluid rounded />

                    </Col>
                    <Col md={4}>   <Link to={`../../Product/${_id}`}> {name}</Link></Col>
                    <Col md={2}>${price}</Col>
                    <Col md={2}>
                      <span>Qunatity</span>
                      <Form.Control as='select' value={product.qty} onChange={(e) => dispatch(Add_toCart(product.cartItem, Number(e.target.value)))}>
                        {QTY(Math.min(5, product.cartItem.countInStock)).map((e: any) => {
                          return <option key={e + 1} value={e + 1}>{e + 1}</option>
                        })}
                      </Form.Control>

                    </Col>
                    <Col md={2}>
                      <Button type='button' variant='light' onClick={() => { dispatch(DELETE_FROM_CART(_id)) }} ><i className='fas fa-trash'></i></Button>
                    </Col>

                  </Row>
                </ListGroup.Item>

              })}


            </ListGroup>
          }


        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Subtotal
                  items {myCarts.reduce((acc, item) => acc + item.qty, 0)}</h2>
                ${myCarts.reduce((acc: any, item: any) => acc + item.qty * item.cartItem.price.toFixed(), 0)}

              </ListGroup.Item>
              <ListGroup.Item>
                <Button onClick={() => {
                    nav('../../shipping')
                }} style={{ width: '100%' }} disabled={myCarts.length > 0 ? false : true} type='button' className='btn-block'>Proceed to CheckOut</Button>
              </ListGroup.Item>
            </ListGroup>

          </Card>
        </Col>

      </Row>

    </div>
  )
}

export default Cartscreen