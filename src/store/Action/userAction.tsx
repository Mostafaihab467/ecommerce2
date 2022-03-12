import { IUserModel } from "../../Models/userModel"
import agent from './../../agent/agent';
import { CLEAR_CART } from "./cartAction";

export const Login = (user: IUserModel) => {

    return async (dispatch: any) => {
        await agent.Auth.login(user).then(res => {
            dispatch(LOGIN_USER(res.data))
        })
    }
}



export const Register = (user: IUserModel) => {
    return async (dispatch: any) => {
        await agent.Auth.register(user).then(res => {
            dispatch(REGISTER_USER(res.data))
        })
    }
}

export const Logout =  () => {
    return async (dispatch: any) => {
       
        dispatch(CLEAR_CART())
        dispatch(LOG_OUT())
    }
}


const REGISTER_USER = (user: IUserModel) => ({
    type: 'REGISTER_USER',
    payload: user

})

export const User_Details = (user: IUserModel) => {
    return async (dispatch: any) => {
        dispatch(USER_DETAILES())
    }

}


const USER_DETAILES =()=>({
    type:'USER_DETAILES',
    payload:''  
})


const LOGIN_USER = (user: IUserModel) => ({
    type: 'LOGIN_USER',
    payload: user
})





const LOG_OUT = () => ({
    type: 'LOGOUT',

})