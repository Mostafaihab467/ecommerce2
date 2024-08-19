import React, { useEffect, useState } from 'react';
import './ProductScreen.scss';
import { ProductModel } from './../../Models/ProductModel';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button, Form, Carousel } from 'react-bootstrap';
import Ratings from '../../Componets/Widgets/Ratings/Ratings';
import { getProductByID } from '../../store/Action/ProductAction';
import Spinner from '../../Componets/Widgets/Spinner/Spinner';
import { useNavigate } from 'react-router';
import { Add_toCart } from '../../store/Action/cartAction';

export const QTY = (countInStock: number) => {
  let items = [];
  for (let i = 0; i < countInStock; i++) {
    items.push(i);
  }
  return items;
};

function ProductScreen() {
  const nav = useNavigate();
  const id = useParams()['id'];
  const [qty, setQty] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductByID(id!));
  }, [dispatch, id]);

  const cartHandler = (prod: ProductModel) => {
    dispatch(Add_toCart(prod, qty));
    nav(`/cart/`);
  };
//AddProductScreen
  const selectedProduct = useSelector((state: any) => state.productRepo.selectedProduct) as ProductModel;

  return (
    <div>
      {selectedProduct._id === '' ? (
        <Spinner />
      ) : (
        <>
          <Link className='btn btn-light my-3' to=''>Go Back</Link>
          <Row>
            <Col md={6}>
              <Carousel>
                {[...Array(4)].map((_, index) => (
                  <Carousel.Item key={index}>
                    <Image src={selectedProduct.image} alt={selectedProduct.name} fluid />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{selectedProduct.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Ratings rating={selectedProduct.rating} numReviews={selectedProduct.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${selectedProduct.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {selectedProduct.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${selectedProduct.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong style={{ color: selectedProduct.countInStock > 0 ? 'green' : 'red' }}>
                          {selectedProduct.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {selectedProduct.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(parseInt(e.target.value))}
                          >
                            {QTY(selectedProduct.countInStock).map((e: any) => (
                              <option key={e + 1} value={e + 1}>
                                {e + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      disabled={selectedProduct.countInStock <= 0}
                      className='btn-block'
                      type='button'
                      style={{ width: '100%' }}
                      onClick={() => cartHandler(selectedProduct)}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ProductScreen;
