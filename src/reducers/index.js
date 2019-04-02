import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import orderReducer from './orderReducer';

export default combineReducers({
  form: formReducer,
  orders: orderReducer
});
