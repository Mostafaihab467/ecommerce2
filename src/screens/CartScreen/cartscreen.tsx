import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Button, ListGroup, Form, Card } from 'react-bootstrap';
import { ICartItem } from '../../Models/CartItem';
import './CartScreen.scss';
import { QTY } from '../Product/ProductScreen';
import { Add_toCart, DELETE_FROM_CART } from '../../store/Action/cartAction';
import { SET_REDIRECT_PATH } from '../../store/Action/RouterAction';

function CartScreen(props: any) {
  const dispatch = useDispatch();
  const myCarts = useSelector((state: any) => state.cartRepo.MyCart) as ICartItem[];
  const isLogged = useSelector((state: any) => state.user.user.token) !== '';
  const paymentMethod = useSelector((state: any) => state.payment.paymentMethod) !== '';
  const isShipping = useSelector((state: any) => state.cartRepo.Shipping_Address.address) !== '';
  const isDarkMode = useSelector((state: any) => state.AppState.isDarkMode)
  const nav = useNavigate();

  const handleCheckoutSteps = (e: any) => {
    e.preventDefault();

    if (!isLogged) return '../../login';
    if (!isShipping) return '../../shipping';
    if (!paymentMethod) return '../../payment';

    return '../../placeOrder';
  };

  return (
    <div className='CartScreen'>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {myCarts.length === 0 ? (
            <>
              <h1>Your Cart is Empty</h1>
              <Link to="/">Go Back</Link>
            </>
          ) : (
            <ListGroup variant="flush">
              {myCarts.map((product: ICartItem) => {
                const { image, _id, name, price, countInStock } = product.cartItem;
                return (
                  <ListGroup.Item key={_id} variant="flush">
                    <Row>
                      <Col md={2}>
                        <Image src={image.startsWith('http') ? image : `/assets/images/${image}`} fluid rounded />
                      </Col>
                      <Col md={4}>
                        <Link className='itemName' to={`../../Product/${_id}`}>{name}</Link>
                      </Col>
                      <Col md={2}>${price}</Col>
                      <Col md={2}>
                        <span>Quantity</span>
                        <Form.Control
                          as="select"
                          value={product.qty}
                          onChange={(e) => dispatch(Add_toCart(product.cartItem, Number(e.target.value)))}
                        >
                          {QTY(Math.min(5, countInStock)).map((e: any) => (
                            <option key={e + 1} value={e + 1}>
                              {e + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button

                          type="button"
                          variant={isDarkMode ? 'dark' : 'light'}
                          onClick={() => {
                            dispatch(DELETE_FROM_CART(_id));
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>
                  Subtotal {myCarts.reduce((acc, item) => acc + item.qty, 0)} items
                </h2>
                ${myCarts.reduce((acc, item) => acc + item.qty * item.cartItem.price, 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={(e) => {
                    const link = handleCheckoutSteps(e);
                    dispatch(SET_REDIRECT_PATH('../../shipping'));
                    nav(link);
                  }}
                  style={{ width: '100%' }}
                  disabled={myCarts.length === 0}
                  type="button"
                  className="btn-block"
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
