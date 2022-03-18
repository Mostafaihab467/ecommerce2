import { ICartItem, C_CartItem } from "../../Models/CartItem";
import { C_Shipping } from "../../Models/ShppingModel";
import { C_Product, ProductModel } from './../../Models/ProductModel';
import { IShiiping } from './../../Models/ShppingModel';



let InitialState = {
    MyCart: new Array<C_CartItem>(),
    Shipping_Address: new C_Shipping()
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
                isItemExist!.qty = (action.qty ? action.qty : 1)
                const item = new C_CartItem(action.payload, isItemExist.qty, isItemExist.id)

                return { ...state, MyCart: [...state.MyCart] }
            } else {

                return { ...state, MyCart: [...state.MyCart, new C_CartItem(action.payload, (action.qty ? action.qty : 1), action.payload._id)] }
            }

        case 'DELETE_FROM_CART':
            return { ...state, MyCart: [...state.MyCart.filter((product: ICartItem) => product.cartItem._id !== action.payload)] }

        case 'ADD_SHIPPING_ADDRESS':
            const shippedAddress = action.payload as IShiiping

        return {...state,Shipping_Address:shippedAddress}

        case 'CLEAR_MY_CART':

        return {...state,MyCart:new Array<C_CartItem>()}
        case 'CLEAR_CART':

        return InitialState

        default: return state
    }

}


export default cartReducer