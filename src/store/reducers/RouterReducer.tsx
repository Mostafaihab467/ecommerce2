import { Action } from "./ProductReducer"


let intilaState={

    redirect :'../../'
}




 const RouterReducer=(state=intilaState,action:Action)=>{

    switch(action.type){

        case 'SET_REDIRECT_PATH':

        return {redirect:action.payload}
        default :return state
    }
}

export default RouterReducer