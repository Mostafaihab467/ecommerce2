import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

import Product from '../../Componets/Widgets/Product/Product'
import {ProductModel} from '../../Models/ProductModel'
import { useSelector } from 'react-redux';

function HomeScreen() {
 

   
    const products = useSelector((state:any)=>state.productRepo.product) as ProductModel[]

    useEffect(()=>{
    

    
    },[[products]])

    return (
        <div>
            {products!==[] && 
            <>
            <h1>Latest Porducts</h1>
            <Row style={{flex:'nowrap'}}>
                {products.map((product:ProductModel) => {
                    return <Col sm={12} md={6} lg={4} xl={3} >
                        <Product item={product}  />
                   
                    </Col>
                })}
             
            </Row>
   </>}
        </div>
    )
}

export default HomeScreen