import merge from 'lodash/merge';

const defaultForm = {
  lat: 37.916134,
  lng: -122.310768,
  tree: "Lemon",
  location: "",
  note: "",
  finder: "",
}

const defaultState = {
  lemons: {},
  errors: [],
  focus: null,
  form: defaultForm,
  formOpen: false
};

const LemonReducer = (state = defaultState, action) => {

  let newState = merge({}, state);
  let newLemon;
  let editLemon;

  switch (action.type){
    case "RECEIVE_ALL_LEMONS":
      newState = merge({}, defaultState, {focus: state.focus}, {lemons: action.lemons});
      return newState;
    case "RECEIVE_SINGLE_LEMON":
      newState = merge(newState, {lemons: merge({}, action.lemon), errors: null}, {errors: []});
      return newState;
    case "EDIT_LEMON":
      editLemon = merge({}, state.lemons[action.lemonId]);
      newState = merge(newState, {form: editLemon, formOpen: true});
      return newState;
    case "SET_FOCUS":
      newState = merge(newState, {focus: action.lemon});
      return newState;
    case "CLEAR_FOCUS":
      newState = merge(newState, {focus: null});
      return newState;
    case "UPDATE_LEMON_FORM":
      newLemon = merge({}, newState.form, action.lemon)
      newState = merge(newState, {form: newLemon});
      return newState;
    case "CLEAR_LEMON_FORM":
      newState = merge(newState, {form: null}, {form: merge({}, defaultForm)});
      return newState
    case "TOGGLE_LEMON_FORM":
      newState = merge(newState, {formOpen: !state.formOpen});
      return newState
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
