import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage'
import {createTransform, persistReducer} from 'redux-persist'
import productReducer from './reducers/ProductReducer'



const PersistConfig={
    key:'root',
    storage,
    whitelist:['workspace','user',"Hub"]
  
  }

export  const root_reducer = combineReducers({
      productRepo:productReducer
})


export default persistReducer(PersistConfig,root_reducer)