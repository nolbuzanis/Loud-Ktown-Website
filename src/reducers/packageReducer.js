export default (state = {}, action) => {
  console.log(action);
  if (action.type === 'SELECT_PACKAGE') {
    return { ...state, package: action.payload };
  }
  return state;
};
