import { Emptyproduct, ProductModel } from "./ProductModel";


const prod =Emptyproduct

export class C_CartItem  {
    cartItem =Emptyproduct
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