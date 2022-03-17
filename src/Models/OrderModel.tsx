import { C_CartItem, ICartItem } from './CartItem';
import { ProductModel } from './ProductModel';
import { C_Shipping, IShiiping } from './ShppingModel';


export interface IOrder {
    Order: ICartItem[],
    paymentMethod: string,
    date: number
    shippingAdress: IShiiping,
    totalPrice: number
    isPaid: boolean,
    shippingPrice: number,
    paidAt :any,
    _id?:any
}


export interface IOrder_Summary {
    id:string,
    paidAt:number
    totalPrice:number,
    isPaid:boolean,
    Deliverd:false
}




export class C_Order {
    paymentMethod: string
    Order = new Array<C_CartItem>()
    shippingAdress = new C_Shipping()
    date = 0
    totalPrice = 0
    shippingPrice = 0
    isPaid = false
    paidAt = 0
    _id=''
   
    constructor(Order: ICartItem[], paymentMethod: string, shippingAdress: IShiiping,  totalPrice: number
        , shippingPrice: number, isPaid: boolean, paidAt: 0,date: number = Date.now(),_id?:any
    ) {
      
        this.Order = Order
        this.paymentMethod = paymentMethod
        this.date = date
        this.shippingAdress = shippingAdress
        this.totalPrice = totalPrice
        this.shippingPrice = shippingPrice
        this.isPaid = isPaid
        this.isPaid = isPaid
        this._id=_id

    }
}

export class C_Order_Summary{
    id=""
    totalPrice=0
    Date=0
    isPaid=false
    Deliverd=false
    constructor( id:string, Date:number,totalPrice:number, isPaid:boolean, Deliverd:false)
    {
        this.id=id,
        this.Date=Date,
        this.Deliverd=Deliverd,
        this.isPaid=isPaid
        this.totalPrice=totalPrice
    }
}




