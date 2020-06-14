export const getLemonsInBounds = (filters) => (
  $.ajax({
    url: "api/lemons",
    method: "GET",
    data: {filters: filters}
  })
)

export const postLemon = (lemon) => (
  $.ajax({
    url: "api/lemons",
    method: "POST",
    data: {lemon: lemon},
  })
)

export const patchLemon = (lemon) => (
  $.ajax({
    url: ("api/lemons/" + lemon.id.toString()),
    method: "PATCH",
    data: {lemon: lemon},
  })
)

export const destroyLemon = (id) => (
  $.ajax({
    url: ("api/lemons/" + id.toString()),
    method: "DELETE",
  })
)
