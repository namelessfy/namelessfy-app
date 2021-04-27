import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function signUp(headers) {
    return request({
      url: "/sign-up",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function signOut(headers) {
    return request({
      url: "/sign-out",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function editUser(headers, body) {
    return request({
      url: "/user/edit",
      requestMethod: "PATCH",
      headers: headers,
      body: body,
    });
  }

  function createTrack({ body, headers = {} }) {
    return request({
      url: "/tracks",
      requestMethod: "POST",
      body: body,
      headers: headers,
    });
  }

  function getFavorites(headers, id = "me") {
    return request({
      url: `/tracks/favorite/${id}`,
      requestMethod: "GET",
      headers: headers,
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    editUser: editUser,
    createTrack: createTrack,
    getFavorites: getFavorites,
  };
}

export default makeApi();
