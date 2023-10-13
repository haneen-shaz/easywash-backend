
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import {serviceListReducer,serviceDetailsReducer} from './Reducers/serviceReducer'
import { userLoginReducer ,userRegisterReducer,userDetailsReducer,userListReducer,userUpdateProfileReducer,adminLoginReducer} from './Reducers/userReducers'


const reducer =combineReducers({
    serviceList:serviceListReducer,
    serviceDetails:serviceDetailsReducer,
    userLogin:userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList: userListReducer,
    adminLogin:adminLoginReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin:{userinfo:userInfoFromStorage}
}
const State = {
    adminlogin:{userinfo:userInfoFromStorage}
}

const middleware = [thunk]

 
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig,reducer)


const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store