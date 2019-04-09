import history from '../history';

export const submitOrder = formValues => {
  return {
    type: 'SUBMIT_FORM',
    payload: formValues
  };
};

export const selectPackage = packageName => {
  history.push('/rent');
  return {
    type: 'SELECT_PACKAGE',
    payload: packageName
  };
};
