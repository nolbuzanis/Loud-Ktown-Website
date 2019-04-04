export default (state = [], action) => {
  if (action.type === 'SUBMIT_FORM') {
    return [...state, action.payload];
  }
  return state;
};
