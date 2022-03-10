import agent from "../../agent/agent"
import { ProductModel } from "../../Models/ProductModel"





export const InitProducts=()=>{
    return async(dispatch:any)=>{
         await agent.productsApi.getAllproducts().then((res)=>{
             dispatch(INITPRODS([res.data]))
         })
    }
}


export const getProductByID=(id:string)=>{
    return async(dispatch:any)=>{ 
        await agent.productsApi.getProductbyId(id).then((res)=>{
            dispatch(SELECTED_PRODUCT(res.data as ProductModel))
        })
    }

}



export const INITPRODS=(products:any)=>({
    type:'INITPRODS',
    payload:products
})

export   const SELECTED_PRODUCT=(item:ProductModel)=>({
    type:'SELECTED_PRODUCT',
    payload:item
})

