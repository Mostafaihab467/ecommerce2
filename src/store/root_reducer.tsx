import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage'
import {createTransform, persistReducer} from 'redux-persist'
import productReducer from './reducers/ProductReducer'
import cartReducer from './reducers/cartReducer'
import { userReducer } from './reducers/userReducer'



const PersistConfig={
    key:'root',
    storage,
    whitelist:['cartRepo','user']
  
  }

  const root_reducer = combineReducers({
      productRepo:productReducer,
      cartRepo:cartReducer,
      user:userReducer
})

const rootReducerCongured = persistReducer(PersistConfig,root_reducer)
export default rootReducerCongured