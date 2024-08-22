import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage'
import {createTransform, persistReducer} from 'redux-persist'
import productReducer from './reducers/ProductReducer'
import cartReducer from './reducers/cartReducer'
import { userReducer } from './reducers/userReducer'
import paymentReducer from './reducers/paymentReducer'
import orderReducer from './reducers/orderReducer'
import  RouterReducer  from './reducers/RouterReducer'
import themeReducer from './reducers/AppState.Reducer'
import StatsticsReducer from './reducers/StatsticsReducer'



const PersistConfig={
    key:'root',
    storage,
    whitelist:['cartRepo','user','payment','order','AppState']
  
  }

  const root_reducer = combineReducers({
      productRepo:productReducer,
      cartRepo:cartReducer,
      user:userReducer,
      payment:paymentReducer,
      order:orderReducer,
      redirection:RouterReducer,
      AppState:themeReducer,
      statics:StatsticsReducer
})

const rootReducerCongured = persistReducer(PersistConfig,root_reducer)
export default rootReducerCongured