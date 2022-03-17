import { C_Product, ProductModel } from './../../Models/ProductModel';
let intialState = {

    product:new Array<C_Product>(),
    selectedProduct:new C_Product('','','','','',0,0,0,0,0) 
 

}


export interface Action {
    type:string
    payload:any
    id:string
}


const productReducer=(state=intialState,action:Action)=>{
    switch(action.type){


        case 'INITPRODS':
       
      
        return {...state,product:[...action.payload][0]}

        case  'SELECTED_PRODUCT' :

        return {...state,selectedProduct:action.payload}

        default :return state;
    }
}









export default productReducer