import agent from "../../agent/agent";
import { ProductModel } from "../../Models/ProductModel";







export const Add_toCart=(item:ProductModel,qty:number)=>{
    return async(dispatch:any)=>{
        await agent.productsApi.addto_cart(item).then((res:any)=>{
            dispatch(ADD_TO_CART(item as ProductModel,qty))
        })

    }
}


export const ADD_TO_CART=(items:ProductModel,qty:number)=>({
    type:'ADD_TO_CART',
    payload:items,
    qty:qty
})


export const DELETE_FROM_CART=(id:String)=>({
    type:'DELETE_FROM_CART',
    payload:id
})
