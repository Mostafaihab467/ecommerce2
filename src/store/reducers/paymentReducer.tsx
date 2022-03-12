import { Action } from "./ProductReducer"

let initilaState = {
    paymentMethod:''

}








const paymentReducer=(state=initilaState,action:Action)=> {


    switch(action.type){

        case 'SET_PAYMENT':

        return {...state,paymentMethod:action.payload}

        default: return state
    }
}

export default paymentReducer