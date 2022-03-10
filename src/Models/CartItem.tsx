import { C_Product, ProductModel } from "./ProductModel";

export class C_CartItem  {
    cartItem =new C_Product('','','','','',0,0,0,0,0) 
    qty = 0
    id=''
    constructor(cartItem:ProductModel,qty:number,id:string){
        this.cartItem = cartItem
        this.qty =qty
        this.id =id
    }
}


export interface ICartItem {
    cartItem:ProductModel
    qty:number
    id:string
}