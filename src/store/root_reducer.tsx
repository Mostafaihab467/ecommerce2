import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage'
import {createTransform, persistReducer} from 'redux-persist'
import productReducer from './reducers/ProductReducer'
import cartReducer from './reducers/cartReducer'



const PersistConfig={
    key:'root',
    storage,
    whitelist:['cartRepo']
  
  }

  const root_reducer = combineReducers({
      productRepo:productReducer,
      cartRepo:cartReducer
})

const rootReducerCongured = persistReducer(PersistConfig,root_reducer)
export default rootReducerCongured