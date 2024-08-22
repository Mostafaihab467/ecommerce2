// src/store/Reducers/themeReducer.ts

import { C_Statstics } from "../../Models/StatsticsModel";


const initialState = {
  statstics: new C_Statstics(0,0,0,0,0),
};



interface Action{
    type: string,  // the name of the action type
    payload:any
}

const soketReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "GET_STATSTICS":
      return {
        ...state,
        statstics: action.payload,
      };
    default:
      return state;
  }
};

export default soketReducer;
