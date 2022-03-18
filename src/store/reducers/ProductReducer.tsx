import { C_Product, ProductModel } from './../../Models/ProductModel';
let intialState = {

    product: new Array<C_Product>(),
    selectedProduct: new C_Product('', '', '', '', '', 0, 0, 0, 0, 0)


}


export interface Action {
    type: string
    payload: any
    id: string
}


const productReducer = (state = intialState, action: Action) => {
    switch (action.type) {


        case 'INITPRODS':


            return { ...state, product: [...action.payload][0] }

        case 'SELECTED_PRODUCT':

            return { ...state, selectedProduct: action.payload }

        case 'UPDATE_PRODUCT':
            var prod = action.payload as ProductModel
            state.product = state.product.filter(x => x._id !== prod._id)
            return { ...state, product: [...state.product, prod] }

        case 'DELETE_PRODUCT':
            state.product = state.product.filter(x => x._id !== action.payload)
            return { ...state, product: [...state.product] }
        default: return state;
    }
}









export default productReducer