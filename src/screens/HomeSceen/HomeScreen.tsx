import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../../Constant/products'
import Product from '../../Componets/Widgets/Product/Product'
import {ProductModel} from '../../Models/ProductModel'

function HomeScreen() {
 
    return (
        <div>
            <h1>Latest Porducts</h1>
            <Row style={{flex:'nowrap'}}>
                {products.map((product:ProductModel) => {
                    return <Col sm={12} md={6} lg={4} xl={3} >
                        <Product item={product}  />
                   
                    </Col>
                })}
            </Row>
        </div>
    )
}

export default HomeScreen