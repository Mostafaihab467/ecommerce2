import { C_Product, ProductModel } from "./ProductModel";


const prod =new C_Product('','','','','',0,0,0,0,0,"",[],"") 

export class C_CartItem  {
    cartItem =new C_Product('','','','','',0,0,0,0,0,"",[],"") 
    qty = 0
    id=''
    constructor(cartItem:ProductModel=prod,qty:number=0,id:string=''){
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