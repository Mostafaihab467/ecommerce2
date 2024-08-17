import React from 'react';
import { ProductModel } from '../../../Models/ProductModel';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './Product.scss';
import Ratings from '../Ratings/Ratings';

interface Props {
  item: ProductModel;
  variant?: 'latest' | 'recommended'; // Add variant prop
}

function Product({ item, variant = 'latest' }: Props) {
  return (
    <Card className={`product-card ${variant}`}>
      <div className="product-card-content">
        <Link to={`/Product/${item._id}`}>
          <Card.Img 
            className="product-image"
            src={item.image} 
            variant="top" 
          />
        </Link>
        <Card.Body className="product-card-body">
          <Link to={`/Product/${item._id}`}>
            <Card.Title as="div">
              <strong className='text'>{item.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Ratings rating={item.rating} numReviews={item.numReviews} />
          </Card.Text>
          <Card.Text className="product-price" as="h4">
            ${item.price}
          </Card.Text>
          {variant === 'recommended' && (
            <div className="recommended-badge">Recommended</div> // Add badge for recommended items
          )}
        </Card.Body>
      </div>
    </Card>
  );
}

export default Product;
