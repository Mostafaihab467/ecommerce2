import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage'
import {createTransform, persistReducer} from 'redux-persist'
import productReducer from './reducers/ProductReducer'
import cartReducer from './reducers/cartReducer'
import { userReducer } from './reducers/userReducer'
import paymentReducer from './reducers/paymentReducer'
import orderReducer from './reducers/orderReducer'
import  RouterReducer  from './reducers/RouterReducer'



const PersistConfig={
    key:'root',
    storage,
    whitelist:['cartRepo','user','payment','order']
  
  }

  const root_reducer = combineReducers({
      productRepo:productReducer,
      cartRepo:cartReducer,
      user:userReducer,
      payment:paymentReducer,
      order:orderReducer,
      redirection:RouterReducer,
})

const rootReducerCongured = persistReducer(PersistConfig,root_reducer)
export default rootReducerCongured