import { IUserModel } from "../../Models/userModel"
import agent from './../../agent/agent';
import { CLEAR_CART } from "./cartAction";
import { ORDER_CLEAR } from "./orderAction";

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

export const deleteUser=(id:string)=>{
    return async(disaptch:any)=>{
        await agent.Account.deleteUser(id).then(res=>{
            disaptch(DELETE_USER(id))
        })
      
    }
}

export const Logout =  () => {
    return async (dispatch: any) => {
       window.localStorage.clear()
        dispatch(CLEAR_CART())
        dispatch(LOG_OUT())
        dispatch(ORDER_CLEAR())
    }
}

export const getAllUsers=()=>{
    return async(dispatch:any)=>{
        // Only "Admins"
        await agent.Account.getAllUsers().then(res=>{
            dispatch(GET_ALL_USERS(res.data))
        })
      
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


const GET_ALL_USERS=(users:IUserModel[])=>({
    type:'GET_ALL_USERS',
    payload:users
})


const DELETE_USER=(id:string)=>({
    type:'DELETE_USER',
    payload:id
})

const LOG_OUT = () => ({
    type: 'LOGOUT',

})