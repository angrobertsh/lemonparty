import merge from 'lodash/merge';

const defaultState = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state = defaultState, action) => {

  let newState = merge({}, state);

  switch (action.type){
    case "RECEIVE_CURRENT_USER":
      newState = merge(defaultState, {currentUser: action.user});
      return newState;
    default:
      return newState;
  }
}


export default SessionReducer;
