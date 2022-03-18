import React, { useState } from 'react'
import EditProdductScreen from '../EditProdductScreen'
import ProductScreenOverView from './ProductScreenOverView'
import { ProductModel } from './../../../Models/ProductModel';




function AdminsEditScreen() {
    const [mode, setMode] = useState('productOverView')
    const [product, setProduct] = useState<ProductModel>()
    return (
        <div>
            {mode == 'productOverView' ?
                <ProductScreenOverView  setProduct={setProduct} setmode={setMode} /> : null}

            {mode == 'EditProduct' ?
                <EditProdductScreen product={product!} setmode={setMode}/> : null}
       

        </div>
    )
}

export default AdminsEditScreen