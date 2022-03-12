import { C_CartItem, ICartItem } from './CartItem';
import { ProductModel } from './ProductModel';


export interface IOrder {
    Order:ICartItem[],
    paymentMethod:string,
    date:number
}


export class C_Order  {
    paymentMethod:string
    Order=new Array<C_CartItem>()
    date=0
   constructor(Order:ICartItem[],paymentMethod:string,date:number=Date.now()){
    this.Order = Order
    this.paymentMethod = paymentMethod
    this.date = date

   }
}


