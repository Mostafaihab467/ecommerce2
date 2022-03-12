import { ICartItem } from "../../Models/CartItem"

export const AddOrder=()=>{
    return async(dis:any)=>{
        dis()
    }
}




const ADD_ORDER=(cart:ICartItem)=>({
  type:'ADD_ORDER',
  payload:cart
})