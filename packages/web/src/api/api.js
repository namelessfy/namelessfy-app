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

  function createTrack(body, headers) {
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

  function likeSong(headers, trackId) {
    return request({
      url: `/tracks/favorite/${trackId}`,
      requestMethod: "POST",
      headers: headers,
    });
  }

  function dislikeSong(headers, trackId) {
    return request({
      url: `/tracks/favorite/${trackId}`,
      requestMethod: "PATCH",
      headers: headers,
    });
  }

  function getSongs(headers, id = "me") {
    return request({
      url: `/tracks/${id}`,
      requestMethod: "GET",
      headers: headers,
    });
  }

  function editTrack(headers, body, id) {
    return request({
      url: `/tracks/${id}`,
      requestMethod: "PATCH",
      headers: headers,
      body: body,
    });
  }

  function deleteSong(headers, id) {
    return request({
      url: `/tracks/${id}`,
      requestMethod: "DELETE",
      headers: headers,
    });
  }

  function createPlaylist(headers, body) {
    return request({
      url: `/playlist`,
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function getAllPlaylists(headers, id = "me") {
    return request({
      url: `/playlist/${id}`,
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
    likeSong: likeSong,
    dislikeSong: dislikeSong,
    getSongs: getSongs,
    editTrack: editTrack,
    deleteTrack: deleteSong,
    createPlaylist: createPlaylist,
    getAllPlaylists: getAllPlaylists,
  };
}

export default makeApi();
