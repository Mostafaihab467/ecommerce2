import { C_User } from "../../Models/userModel"
import { Action } from "./ProductReducer"
import { IUserModel } from './../../Models/userModel';

let IntialState = {
    user: new C_User("", "", "", "", false,""),
    AllUsers: new Array<C_User>()
}




export const userReducer = (state = IntialState, action: Action) => {

    switch (action.type) {

        case 'LOGIN_USER':
            var {_id, name, token, email, isAdmin, password } = action.payload as any
            isAdmin = isAdmin=='true'
            var LoggedUser = new C_User(email, password, name, token, isAdmin,_id)
            window.localStorage.setItem('jwt', token)
            return { ...state, user: LoggedUser }

        case 'REGISTER_USER':

            var LoggedUser = new C_User(email, password, name, token, isAdmin,_id)
            window.localStorage.setItem('jwt', token)
            return { ...state, user: LoggedUser }

        case 'USER_DETAILES':

            return { ...state }

        case 'GET_ALL_USERS':
            var users = action.payload as IUserModel[]
            users = users.map((e:any)=>{
                e.isAdmin=e.isAdmin == 'true'
                return e
            })
            return { ...state, AllUsers: users }

        case 'DELETE_USER':
            var users = state.AllUsers.filter(x=>x._id !== action.payload)
        return {...state,AllUsers:users}

        case 'LOGOUT':
            window.localStorage.clear()
            return IntialState

        default: return state
    }

}


