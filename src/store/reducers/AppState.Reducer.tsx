// src/store/Reducers/themeReducer.ts
import { TOGGLE_DARK_MODE } from '../../store/Action/AppStateAction';

const initialState = {
  isDarkMode: true,
};

const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    default:
      return state;
  }
};

export default themeReducer;
