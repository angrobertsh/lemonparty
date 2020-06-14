import * as LEMON_UTILS from '../utils/lemon_api_utils';

export const fetchLemons = filters => dispatch => (
  LEMON_UTILS.getLemonsInBounds(filters)
    .then(lemons => dispatch(receiveAllLemons(lemons)))
);

export const createLemon = lemon => dispatch => (
  LEMON_UTILS.postLemon(lemon)
    .then(lemon => dispatch(receiveSingleLemon(lemon)),
      errors => dispatch(receiveLemonErrors(errors.responseJSON.errors)))
);

export const updateLemon = lemon => dispatch => (
  LEMON_UTILS.patchLemon(lemon)
    .then(lemon => dispatch(receiveSingleLemon(lemon)),
      errors => dispatch(receiveLemonErrors(errors.responseJSON.errors)))
);

export const deleteLemon = id => dispatch => (
  LEMON_UTILS.destroyLemon(id)
    .then(lemons => dispatch(receiveAllLemons(lemons)),
      errors => dispatch(receiveLemonErrors(errors.responseJSON.errors)))
);

export const setFocus = (lemon) => ({
  type: "SET_FOCUS",
  lemon
});

export const clearFocus = () => ({
  type: "CLEAR_FOCUS"
});

export const receiveSingleLemon = (lemon) => ({
  type: "RECEIVE_SINGLE_LEMON",
  lemon
});

export const receiveAllLemons = (lemons) => ({
  type: "RECEIVE_ALL_LEMONS",
  lemons
});

export const receiveLemonErrors = (errors) => ({
  type: "RECEIVE_LEMON_ERRORS",
  errors
});

export const clearLemonErrors = () => ({
  type: "CLEAR_LEMON_ERRORS"
});
