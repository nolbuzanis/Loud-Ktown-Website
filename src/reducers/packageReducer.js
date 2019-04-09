export default (state = {}, action) => {
  if (action.type === 'SELECT_PACKAGE') {
    return { ...state, package: action.payload };
  }
  return state;
};
