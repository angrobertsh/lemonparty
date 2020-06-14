import merge from 'lodash/merge';

const defaultState = {
  lemons: {},
  errors: [],
  focus: null
};

const LemonReducer = (state = defaultState, action) => {

  let newState = merge({}, state);

  switch (action.type){
    case "RECEIVE_ALL_LEMONS":
      newState = merge({}, defaultState, {focus: state.focus}, {lemons: action.lemons});
      return newState;
    case "RECEIVE_SINGLE_LEMON":
      newState = merge(newState, {lemons: action.lemons, errors: null}, {errors: []});
      return newState;
    case "SET_FOCUS":
      newState = merge(newState, {focus: action.lemon});
      return newState;
    case "CLEAR_FOCUS":
      newState = merge(newState, {focus: null});
      return newState;
    case "RECEIVE_LEMON_ERRORS":
      newState = merge(newState, {errors: action.errors});
      return newState;
    case "CLEAR_LEMON_ERRORS":
      newState = merge(newState, {errors: null}, {errors: []});
      return newState;
    default:
      return newState;
  }
}


export default LemonReducer;
