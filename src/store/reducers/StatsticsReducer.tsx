// src/store/Reducers/themeReducer.ts

import { C_Statstics, C_SystemStats } from "../../Models/StatsticsModel";


const initialState = {
  statstics: new C_Statstics(0,0,0,0,0),
  serverHealth:new C_SystemStats()
};



interface Action{
    type: string,  // the name of the action type
    payload:any
}

const themeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "GET_STATSTICS":
      return {
        ...state,
        statstics: action.payload,
        
      };
      case'SERVER_HEALTH':
      return {...state,serverHealth:action.payload
      
      
      }

    default:
      return state;
  }
};

export default themeReducer;
