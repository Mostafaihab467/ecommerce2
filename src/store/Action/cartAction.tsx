import agent from "../../agent/agent";
import { ProductModel } from "../../Models/ProductModel";
import { IShiiping } from "../../Models/ShppingModel";







export const Add_toCart=(item:ProductModel,qty:number)=>{
    return async(dispatch:any)=>{
        await agent.productsApi.addto_cart(item).then((res:any)=>{
            dispatch(ADD_TO_CART(item as ProductModel,qty))
        })

    }
}

export const Add_Shipping_Address=(shipped:IShiiping)=>{

    return async(dispatch:any)=>{
        dispatch(ADD_SHIPPING_ADDRESS(shipped))
    }   
}




 const ADD_SHIPPING_ADDRESS=(shipAddress:IShiiping)=>({
    type:'ADD_SHIPPING_ADDRESS',
    payload:shipAddress
})

export const CLEAR_CART=()=>({
    type:'CLEAR_CART'
})

export const ADD_TO_CART=(items:ProductModel,qty:number)=>({
    type:'ADD_TO_CART',
    payload:items,
    qty:qty
})


export const DELETE_FROM_CART=(id:String)=>({
    type:'DELETE_FROM_CART',
    payload:id
})
