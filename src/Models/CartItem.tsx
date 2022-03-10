import { C_Product, ProductModel } from "./ProductModel";

export class C_CartItem  {
    cartItem =new C_Product('','','','','',0,0,0,0,0) 
    qty = 0
    constructor(cartItem:ProductModel,qty:number){
        this.cartItem = cartItem
        this.qty =qty
    }
}


export interface ICartItem {
    cartItem:ProductModel
    qty:number
}