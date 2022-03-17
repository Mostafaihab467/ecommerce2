import { ICartItem } from "../../Models/CartItem"
import { IOrder } from './../../Models/OrderModel';
import agent from './../../agent/agent';

export const AddOrder=(order:IOrder)=>{
    return async(exec:any)=>{
        await agent.Order.placeOrder(order).then(res=>{
            exec(ADD_ORDER(order,res.data.id,res.data.paidAt))
        })
      
    }
}

export const PayOrder=(id:string)=>{
    return async(dispatch:any)=>{
        await agent.Order.payOrder(id).then(res=>{
            dispatch(PAY_ORDER(res.data))
        })
    }
}

export const getAllMyOrders=()=>{
    return async(dispatch:any)=>{
        await agent.Order.getMyOrders().then(res=>{
            dispatch(GET_MYORDERS(res.data))
        })
    }
}

export const getOrderById=(id:string)=>{
    return async(dispatch:any)=>{
        await agent.Order.findOrderbyId(id).then(res=>{
            
            dispatch(GET_MY_ORDER_BY_ID(res.data))
        })
    }
}



const ADD_ORDER=(order:IOrder,id:string,paidAt:number)=>({
  type:'ADD_ORDER',
  payload:order,
  id:id,
  paidAt:paidAt
})

const PAY_ORDER=(order:IOrder)=>({
    type:'PAY_ORDER',
    payload:order

})
const GET_MYORDERS=(data:any)=>({
    type:'GET_MYORDERS',
    payload:data
})
const GET_MY_ORDER_BY_ID=(order:IOrder)=>({
    type:'GET_MY_ORDER_BY_ID',
    payload:order
})
export const ORDER_CLEAR=()=>({
    type:'CLEAR'
})
