import history from '../history';
import axios from 'axios';

export const submitOrder = formValues => async (dispatch, getState) => {
  // Add package selection to formValues object
  formValues.package = !getState().selected.package
    ? 'No package selected'
    : getState().selected.package.title;

  const response = await axios.post(
    'https://script.google.com/macros/s/AKfycbwC12_ZmZeKrzbBy5G_4uDSkzP0il33Ct0-nGYev68elnqSWig/exec',
    formValues
  );
  dispatch({
    type: 'SUBMIT_FORM',
    payload: response.data
  });
};

export const selectPackage = packageName => {
  history.push('/rent');
  return {
    type: 'SELECT_PACKAGE',
    payload: packageName
  };
};
