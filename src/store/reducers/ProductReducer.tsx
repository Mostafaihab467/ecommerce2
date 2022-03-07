import { C_Product, ProductModel } from './../../Models/ProductModel';
let intialState = {

    product:new Array<C_Product>(),
    selectedProduct:new C_Product('','','','','',0,0,0,0,0) 
 

}


interface Action {
    type:string
    payload:any
}


const productReducer=(state=intialState,action:Action)=>{
    switch(action.type){

        case  'SELECTED_PRODUCT' :

        return {...state,product:action.payload}

        default :return state;
    }
}









export default productReducer