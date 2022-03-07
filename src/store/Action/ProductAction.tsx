import { ProductModel } from "../../Models/ProductModel"


export const selectProduct=(item:ProductModel)=>{
    return (dispatch:any)=>{
        dispatch(SELECTED_PRODUCT(item))
    }

}

export   const SELECTED_PRODUCT=(item:ProductModel)=>({
    type:'SELECTED_PRODUCT',
    payload:item
})