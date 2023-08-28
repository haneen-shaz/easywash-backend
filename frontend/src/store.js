
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {serviceListReducer,serviceDetailsReducer} from './Reducers/serviceReducer'
import { userLoginReducer ,userRegisterReducer,userDetailsReducer} from './Reducers/userReducers'
const reducer =combineReducers({
    serviceList:serviceListReducer,
    serviceDetails:serviceDetailsReducer,
    userLogin:userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin:{userinfo:userInfoFromStorage}
}

const middleware = [thunk]




const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store