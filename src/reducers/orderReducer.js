export default (state = [], action) => {
  console.log(action.type);
  if (action.type === 'SUBMIT_FORM') {
    return [...state, action.payload];
  }
  return state;
};
