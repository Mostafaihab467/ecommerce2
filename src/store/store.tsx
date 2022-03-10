import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import  root_reducer  from "../store/root_reducer";



export const store  =  createStore (root_reducer,composeWithDevTools(applyMiddleware(thunk)))
export const  persistor = persistStore(store)




export default{store,persistor}