export const logIn = (user) => (
  $.ajax({
    method: "POST",
    url: 'api/session',
    data: {user: user},
  })
);
