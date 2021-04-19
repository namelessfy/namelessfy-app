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

  return {
    signUp: signUp,
    signOut: signOut,
    editUser: editUser,
  };
}

export default makeApi();
