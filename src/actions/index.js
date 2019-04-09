export const submitOrder = formValues => {
  return {
    type: 'SUBMIT_FORM',
    payload: formValues
  };
};

export const selectPackage = packageName => {
  console.log('action creator called!');
  return {
    type: 'SELECT_PACKAGE',
    payload: packageName
  };
};
