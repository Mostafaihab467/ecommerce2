import { ICartItem } from "../../Models/CartItem"
import { IOrder } from './../../Models/OrderModel';

export const AddOrder=(order:IOrder)=>{
    return async(exec:any)=>{
        exec(ADD_ORDER(order))
    }
}




const ADD_ORDER=(order:IOrder)=>({
  type:'ADD_ORDER',
  payload:order
})