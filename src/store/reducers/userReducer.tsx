import { C_User } from "../../Models/userModel"
import { Action } from "./ProductReducer"
import { IUserModel } from './../../Models/userModel';

let IntialState = {
    user: new C_User("", "", "", "", false)
}




export const userReducer = (state = IntialState, action: Action) => {

    switch (action.type) {

        case 'LOGIN_USER':
            const { name, token, email, isAdmin, password } = action.payload as IUserModel
            var LoggedUser = new C_User( email, password,name,token, isAdmin)
            window.localStorage.setItem('jwt', token)
            return { ...state, user: LoggedUser }

        case 'REGISTER_USER':

            var LoggedUser = new C_User( email, password,name,token, isAdmin)
            window.localStorage.setItem('jwt', token)
            return { ...state, user: LoggedUser }

        case 'USER_DETAILES':

            return { ...state }

        case 'LOGOUT':
            window.localStorage.clear()
            return IntialState

        default: return state
    }

}


