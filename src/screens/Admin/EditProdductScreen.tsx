import React, { useState } from 'react'
import { ListGroup, Row, Col, Button, Form, Container, ListGroupItem ,Image} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { udateProduct } from '../../store/Action/ProductAction';
import { ProductModel } from './../../Models/ProductModel';



interface Props {
    setmode: any,
    product:ProductModel
}

function EditProdductScreen({ setmode,product }: Props) {


    const dispatch =useDispatch()
    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [brand, setbrand] = useState(product.brand)
    const [countInStock, setcountInStock] = useState(product.countInStock)
    const [description, setDescription] = useState(product.description)
    const [category, setCategory] = useState(product.category)


    const submitButton = () => {

            const Editproduct = {
                _id:product._id,
                numReviews:product.numReviews,
                rating:product.rating,
                name:name,
                price:price,
                brand:brand,
                countInStock:countInStock,
                description:description,
                category:category

            } as ProductModel

            dispatch(udateProduct(Editproduct))
    }

    return (
        <div>
            <h1>EditProduct</h1>
            <Row >
              
                <Col md={5} >
                    <Form onSubmit={submitButton}>
                        <Form.Group controlId='email'>
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type='text' placeholder='text' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>


                        <Form.Group controlId='password'>
                            <Form.Label>Price </Form.Label>
                            <Form.Control type='text' placeholder='passwod' value={price} onChange={(e) => setPrice(Number(e.target.value))}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Brand </Form.Label>
                            <Form.Control type='text' placeholder='Product Brand' value={brand} onChange={(e) => setbrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>countInStock </Form.Label>
                            <Form.Control type='text' placeholder='countInStock' value={countInStock} onChange={(e) => setcountInStock(Number(e.target.value))}></Form.Control>
                        </Form.Group>

                      

                        <Form.Group controlId='password'>
                            <Form.Label>category </Form.Label>
                            <Form.Control type='text' placeholder='Product Brand' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>description </Form.Label>
                            <Form.Control  as={'textarea'} type='text' placeholder='Product Brand' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' >Edit</Button>
                
                    </Form>

                    <Row className='py-3'>
                        <Col>New Customer? <Link to='../register'>Register</Link></Col>
                    </Row>
                </Col>
                <Col md={3}>
                    <Image fluid src={product.image}/>
                </Col>
            </Row>

        </div>
    )
}

export default EditProdductScreen