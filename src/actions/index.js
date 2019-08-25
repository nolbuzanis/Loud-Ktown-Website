import history from '../history';

export const submitOrder = formValues => async (dispatch, getState) => {
  history.push('/checkout');
  // Add package selection to formValues object
  formValues.package = !getState().selected.package
    ? 'No package selected'
    : getState().selected.package.title;
  dispatch({
    type: 'SUBMIT_FORM',
    payload: formValues
  });
};

export const selectPackage = packageName => {
  history.push('/rent');
  return {
    type: 'SELECT_PACKAGE',
    payload: packageName
  };
};
/*
export const getCustomerInfo = () => async (dispatch, getState) => {
  const customerValues = getState().form.rent.values;
  dispatch({
    type: 'FETCH_INFO',
    payload: customerValues
  });
};*/
