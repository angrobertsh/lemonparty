import * as TRUCK_ACTIONS from './truck_actions';
import * as LEMON_ACTIONS from './lemon_actions';

export const updateFilter = (filter, value) => (dispatch, getState) => {
  dispatch(updateFilterStore(filter, value));
  return TRUCK_ACTIONS.fetchTrucks(getState().filters)(dispatch);
};

export const updateLemonFilter = (filter, value) => (dispatch, getState) => {
  dispatch(updateFilterStore(filter, value));
  return LEMON_ACTIONS.fetchLemons(getState().filters)(dispatch);
};

export const updateFilterStore = (filter, value) => ({
  type: "UPDATE_FILTER_STORE",
  filter,
  value
});
