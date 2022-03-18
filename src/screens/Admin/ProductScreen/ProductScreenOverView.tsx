import { stat } from 'fs';
import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ProductModel } from '../../../Models/ProductModel';
import { deleteProduct } from '../../../store/Action/ProductAction';
import './Edit_ProductScreen.scss'


interface Props {
    setmode:any,
    setProduct:any
}

function ProductScreenOverView({setmode,setProduct}:Props) {
    const products = useSelector((state: any) => state.productRepo.product) as ProductModel[]
    const dispatch = useDispatch()
    const myProd = () => {

    }
    return (
        <div>
         <div>
            <div className='create_prod'>
                <Button variant="success">Create</Button>{' '}
                </div>
                <table>
                    <tr>

                        <th className='headerTh'><h4>ID</h4></th>
                        <th className='headerTh'><h4>Image</h4></th>
                        <th className='headerTh'><h4>Price</h4></th>
                        <th className='headerTh'><h4>Category</h4></th>
                        <th className='headerTh'><h4>Brand</h4></th>
                        <th></th>
                    </tr>

                    {products.map((prod: ProductModel) => {
                     return(   <tr>

                            <th><span>{prod._id}</span></th>
                            <th><img className='productImg' src={require(`../../../assets/images/${prod.image}`)}/></th>
                            <th>${prod.price}</th>
                            <th> {prod.category}</th>
                            <th>{prod.brand}</th>
                            <th><div className='usersAction_div'>
                                 <Button variant='light' className='btn-sm action edit' onClick={()=>{
                                     setmode('EditProduct')
                                     setProduct(prod)
                                 }}>
                                    <i className='fas fa-edit'></i>
                                    </Button>
                                    <Button   variant='danger' className='btn-sm action delete' onClick={()=>{
                                        dispatch(deleteProduct(prod._id))
                                      
                                    }}>
                                    <i className='fas fa-trash'></i>
                                    </Button>
                            </div>
                                
                                </th>
                        </tr>)
                    })}



                </table>
            </div>

        </div>
    )
}

export default ProductScreenOverView