import { C_CartItem } from "../../Models/CartItem"
import { Action } from "./ProductReducer"
import { C_Order, IOrder } from './../../Models/OrderModel';

let initialState = {

    Orders: new Array<C_Order>()
}



const orderReducer = (state = initialState, action: Action) => {


    switch (action.type) {

        case 'ADD_ORDER':
        const order = action.payload as IOrder
        return {...state,Order:[...state.Orders,order]}

        default: return state
    }
}

export default orderReducer