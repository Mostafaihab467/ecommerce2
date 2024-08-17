import { Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './Carosal.scss'
import { ProductModel } from '../../../Models/ProductModel';
import { useEffect } from 'react';


interface CarosalProps {
    products: ProductModel[];
  }

function Carosal({products}:CarosalProps) {




  return (
    <>
    {products.length > 3 ?
    <Carousel>
      <Carousel.Item>
      <Card.Img 
            width={250}
            height={550}
            className="CarosalImage"
            src={products[0].image} 
            variant="top" />


        <Carousel.Caption>
          <h3 className="CrosalDescription">{products[1].description}</h3>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>


      <Card.Img 
            className="CarosalImage"
            src={products[2].image} 
            variant="top" />
        <Carousel.Caption>
        <h3 className="CrosalDescription">{products[2].description}</h3>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Card.Img 
            className="CarosalImage"
            src={products[3].image} 
            variant="top" />
        <Carousel.Caption>
        <h3 className="CrosalDescription">{products[3].description}</h3>
        
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    : <>No Items</> }     </>
  );
}
export default  Carosal