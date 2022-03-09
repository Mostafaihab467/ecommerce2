import React from 'react'
import {ProductModel} from '../../../Models/ProductModel'
import {Link ,useNavigate} from "react-router-dom";
import { Card } from 'react-bootstrap';

import './Product.scss'
import Ratings from '../Ratings/Ratings';
import { useDispatch } from 'react-redux';


interface Props{
  item:ProductModel
}

function Product({item}:Props) {






  return (
    <Card className='main_itme_card' >
    <div className='item_contentsCard' >
    <Link to={`/Product/${item._id}`} >
      <Card.Img  src={require(`../../../assets/images/${item.image}`)} variant='top'/>
      
    </Link>
    <Link to={`/product/${item._id}`} >
    <Card.Body className='itmeNameCard'>
        <Card.Title  as='div'><strong>{item.name}</strong></Card.Title>
    </Card.Body>
    </Link>
    <Card.Text as='div' >
    <Ratings rating={item.rating} numReviews={item.numReviews}/>

      </Card.Text>
     
      <Card.Text className='priceCard' as='h4'>
          ${item.price}
        </Card.Text>
    </div>
    </Card>
  )
}

export default Product