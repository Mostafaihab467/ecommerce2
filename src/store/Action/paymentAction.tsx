export const setPayment=(payment:string)=>{
    return async(dispatch:any)=>{
        dispatch(SET_PAYMENT(payment))
    }
}


const SET_PAYMENT=(payment:string)=>({
    type:'SET_PAYMENT',
    payload:payment
})