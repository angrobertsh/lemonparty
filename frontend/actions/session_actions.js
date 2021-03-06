import * as SESSION_UTILS from '../utils/session_api_utils';

export const logIn = (userData) => dispatch => (
  SESSION_UTILS.logIn(userData)
    .then((user) => {
      dispatch(receiveCurrentUser(user));
    })
);

export const logOut = () => dispatch => (
  SESSION_UTILS.logOut()
    .then(() => {
      dispatch(receiveCurrentUser(null));
    })
);

export const receiveCurrentUser = (user) => ({
    type: "RECEIVE_CURRENT_USER",
    user: user,
});
