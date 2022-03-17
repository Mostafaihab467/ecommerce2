import React, { useEffect } from 'react'
import './ListMyOrder.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { IOrder, IOrder_Summary } from './../../Models/OrderModel';
import { getAllMyOrders, getOrderById } from '../../store/Action/orderAction';
function ListMyOrder() {

    const dispatch = useDispatch()
    const nav = useNavigate()
    useEffect(()=>{
 
        dispatch(getAllMyOrders())

    },[])

    const ordersSummary = useSelector((state: any) => state.order.Orders_Summary) as IOrder_Summary[]

    return (
        <div>
            <div>
                <table>
                    <tr>

                        <th className='headerTh'><h4>ID</h4></th>
                        <th className='headerTh'><h4>DATE</h4></th>
                        <th className='headerTh'><h4>TOTAL</h4></th>
                        <th className='headerTh'><h4>PAID</h4></th>
                        <th className='headerTh'><h4>DELIVERD</h4></th>
                        <th></th>
                    </tr>

                    {ordersSummary.map((order: IOrder_Summary) => {
                    return   ( <tr>

                            <th>{order.id}</th>
                            <th> {new Date(order.paidAt).toString().split('GMT')[0]}</th>
                            <th>{order.paidAt}</th>
                            <th>{order.isPaid ? <span className='True'>True</span> : <span className='False'>False</span>}</th>
                            <th className='False'>false</th>
                            <th> <button onClick={()=>{
                                dispatch(getOrderById(order.id))
                                nav('../OrderScreen')
                            }}>Details</button></th>
                        </tr>)
                    })}



                </table>
            </div>

        </div>
    )
}

export default ListMyOrder

function GET_MY_ORDER_BY_ID(): any {
    throw new Error('Function not implemented.');
}
