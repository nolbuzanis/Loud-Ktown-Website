export const submitOrder = formValues => {
  return {
    type: 'SUBMIT_FORM',
    payload: formValues
  };
};
