import { ICartItem, C_CartItem } from "../../Models/CartItem";
import { C_Product, ProductModel } from './../../Models/ProductModel';



let InitialState = {
    MyCart: new Array<C_CartItem>()
}



interface Action {
    type: string,
    payload: any,
    qty?: number
}

const cartReducer = (state = InitialState, action: Action) => {

    switch (action.type) {
        case 'ADD_TO_CART':

            const isItemExist = state.MyCart.find((product: ICartItem) => {
                return product.cartItem._id == action.payload._id
            })



            if (isItemExist) {
                isItemExist!.qty = isItemExist!.qty +  (action.qty ?  action.qty : 1)
                const item = new C_CartItem(action.payload, isItemExist.qty)

                return { ...state, MyCart: [item] }
            } else {

                return { ...state, MyCart: [...state.MyCart, new C_CartItem(action.payload, 1)] }
            }

        case 'DELE_FROM_CART':
            const item =  state.MyCart.find((product:ICartItem)=>product.cartItem._id == action.payload._id)

            if(item){

            }else{
                
            }
            return { ...state }

        default: return state
    }

}


export default cartReducer