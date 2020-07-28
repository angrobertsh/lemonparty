import merge from 'lodash/merge';

const randomLat = (Math.random() * (37.9244937846925 - 37.9091569840984)) + 37.9091569840984
const randomLng = (Math.random() * (-122.309903483932 - (-122.298015933578))) - 122.298015933578

const defaultForm = {
  lat: randomLat,
  lng: randomLng,
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
  formOpen: false,
  modalOpen: false
};

const LemonReducer = (state = defaultState, action) => {

  let newState = merge({}, state);
  let newLemon;
  let editLemon;
  let newLemons;
  let newFocus;
  let newForm;

  switch (action.type){
    case "RECEIVE_ALL_LEMONS":
      newState = merge({}, defaultState, {modalOpen: state.modalOpen}, {focus: state.focus}, {formOpen: state.formOpen}, {form: state.form}, {lemons: action.lemons});
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
      if (state.form.id) {
        newState = merge(newState, {formOpen: !state.formOpen}, {form: null}, {form: merge({}, defaultForm)});
      } else {
        newState = merge(newState, {formOpen: !state.formOpen});
      }
      return newState
    case "TOGGLE_LEMON_MODAL":
      newState = merge(newState, {modalOpen: action.val});
      return newState
    case "RECEIVE_LEMON_ERRORS":
      newState = merge(newState, {errors: null}, {errors: action.errors});
      return newState;
    case "REMOVE_LEMON":
      newLemons = merge({}, Object.keys(state.lemons).reduce((acc, lemonId) => {
        if(parseInt(action.id) !== parseInt(lemonId)) {
          acc[lemonId] = state.lemons[lemonId];
        }

        return acc;
      }, {}))
      newFocus = (state.focus && (parseInt(state.focus.id) === parseInt(action.id))) ? null : state.focus;
      newForm = parseInt(state.form.id) === parseInt(action.id) ? defaultForm : state.form;
      newState = merge(newState, {lemons: null, form: newForm, focus: newFocus}, {lemons: newLemons});
      return newState;
    case "CLEAR_LEMON_ERRORS":
      newState = merge(newState, {errors: null}, {errors: []});
      return newState;
    default:
      return newState;
  }
}


export default LemonReducer;
