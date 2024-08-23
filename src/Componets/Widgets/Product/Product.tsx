import React from 'react';
import { ProductModel } from '../../../Models/ProductModel';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './Product.scss';
import Ratings from '../Ratings/Ratings';

interface Props {
  item: ProductModel;
  variant?: 'latest' | 'recommended'; // Add variant prop
  grid: string
}

function Product({ item, variant = 'latest', grid }: Props) {
  return (
    <>
      {grid === 'list' ?
        <Card className={`product-card ${variant}`}>
          <div className="product-card-content">
            <Link to={`/Product/${item._id}`}>
              <img
                className="product-image"
                src={item.image}
                alt={''}
              />
            </Link>
            <Card.Body className="product-card-body">
              <Link style={{ textDecoration: 'none' }} className='link' to={`/Product/${item._id}`}>
                <Card.Title as="div">
                  <span style={{ color: 'black' }} className='text'>{item.name}</span>
                </Card.Title>
              </Link>
              <Card.Text as="div">
                <Ratings rating={item.rating} numReviews={item.numReviews} />
              </Card.Text>
              <Card.Text color='black' className="product-price" as="h4">
                ${item.price}
              </Card.Text>
              {variant === 'recommended' && (
                <div className="recommended-badge">Recommended</div> // Add badge for recommended items
              )}
            </Card.Body>
          </div>
        </Card>
        :
        <div className='product-card-content grid'>
        <Card.Body className="product-card-body">
          <Link style={{ textDecoration: 'none' }} to={`/Product/${item._id}`}>
            <div className='card_wrapper'>
              <img
                className="product-image"
                src={item.image}
                alt={''}
              />
              <div className='item_details'>
                <div className='item_name'>
                  <h1>{item.name}</h1>
                </div>
                <div className='item_description'>
                  <h2>{item.description}</h2>
                </div>
                <div className='item_footer'>
                  <div className='item_price'>
                    <h2>${item.price}</h2>
                  </div>
                  <div className='item_rating'>
                    <h2><Ratings rating={item.rating} numReviews={item.numReviews} /></h2>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Card.Body>
      </div>
      

      }
    </>
  );
}

export default Product;
