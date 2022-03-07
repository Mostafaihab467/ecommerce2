import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { root_reducer } from "../store/root_reducer";



export const store  =  createStore (root_reducer,composeWithDevTools(applyMiddleware(thunk)))