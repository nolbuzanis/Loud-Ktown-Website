import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import orderReducer from './orderReducer';
import packageReducer from './packageReducer';

export default combineReducers({
  form: formReducer,
  orders: orderReducer,
  selected: packageReducer
});
