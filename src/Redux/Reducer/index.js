import { combineReducers } from 'redux'; 
import { authReducer } from './authReducer';
import { productReducers } from './productReducers';

export default combineReducers({
    auth : authReducer,
    product : productReducers
})