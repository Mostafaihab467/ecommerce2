import { C_CartItem } from "../../Models/CartItem"

import { C_Order, C_Order_Summary, IOrder, IOrder_Summary } from './../../Models/OrderModel';
import { C_Shipping } from "../../Models/ShppingModel";

let initialState = {

    Orders: new Array<C_Order>(),
    CurrentOrder: new C_Order([], "", new C_Shipping(), 0, 0, false, 0, 1),
    Orders_Summary:new Array<C_Order_Summary>()

}



interface Action {

    payload: any
    id: string,
    type: string
    paidAt: string,
    DeliverdAt: string

}

const orderReducer = (state = initialState, action: Action) => {


    switch (action.type) {

        case 'ADD_ORDER':
            var order = action.payload as IOrder
            order._id = action.id
            order.paidAt = action.paidAt

            return { ...state, Order: [...state.Orders, order], CurrentOrder:order }

        case 'PAY_ORDER':
            var order = action.payload as IOrder

            state.Orders = state.Orders.filter(x =>x._id !== order._id)
            state.CurrentOrder.isPaid = order.isPaid
            
            return { ...state, Orders: [...state.Orders, order],CurrentOrder: state.CurrentOrder }
        case 'GET_MYORDERS':    
            const orders = action.payload  as IOrder_Summary[]

            return {...state,Orders_Summary:[...orders]}

        case 'GET_MY_ORDER_BY_ID':
            const current = action.payload 
            var ICARTARR = current.Order.map((e:any)=>e     ) 

            var New = ICARTARR.map((e:any)=>{
  
                    return {cartItem:e,qty:Number(e.qty)}
            })
            
            var Myorder = new C_Order(New,"PayPal",current.shippingAdress,current.totalPrice,
            current.shippingPrice,current.isPaid,0,1,current._id) as IOrder
        return {...state,CurrentOrder:Myorder}


        case 'CELAR':
            return initialState
        default: return state
    }
}

export default orderReducer