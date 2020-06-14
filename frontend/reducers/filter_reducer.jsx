import merge from 'lodash/merge';

const defaultState = {
  bounds: {},
  food: "",
  hours: "",
  type: "",
  days: []
};

const FilterReducer = (state = defaultState, action) => {

  let newState = merge({}, state);

  switch (action.type){
    case "UPDATE_FILTER_STORE":
      newState = merge(newState, {[action.filter]: action.value});
      return newState;
    default:
      return newState;
  }
}


export default FilterReducer;
