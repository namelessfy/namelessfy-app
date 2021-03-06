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

  function getFavoritePlaylists(headers, id = "me") {
    return request({
      url: `/playlist/favorite/${id}`,
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getPlaylistById(headers, id) {
    return request({
      url: `/playlist/${id}`,
      requestMethod: "GET",
      headers: headers,
    });
  }

  function addSongToPlaylist(headers, songId, id) {
    return request({
      url: `/playlist/${id}/add`,
      requestMethod: "PATCH",
      headers: headers,
      body: { songId },
    });
  }

  function editPlaylistById(headers, body, id) {
    return request({
      url: `/playlist/${id}`,
      requestMethod: "PATCH",
      headers: headers,
      body: body,
    });
  }

  function deletePlaylistById(headers, id) {
    return request({
      url: `/playlist/${id}`,
      requestMethod: "DELETE",
      headers: headers,
    });
  }

  function likePlaylist(headers, id) {
    return request({
      url: `/playlist/favorite/add/${id}`,
      requestMethod: "PATCH",
      headers: headers,
    });
  }

  function dislikePlaylist(headers, id) {
    return request({
      url: `/playlist/favorite/remove/${id}`,
      requestMethod: "PATCH",
      headers: headers,
    });
  }

  function removeFromPlaylistById(headers, songId, playlistId) {
    return request({
      url: `/playlist/${playlistId}/remove`,
      requestMethod: "PATCH",
      headers: headers,
      body: { _id: songId },
    });
  }

  function getUserByUsername(headers, userName) {
    return request({
      url: `/user/${userName}`,
      requestMethod: "GET",
      headers: headers,
    });
  }

  function getFollowedUsersById(headers, id = "me") {
    return request({
      url: `/user/following/${id}`,
      requestMethod: "GET",
      headers: headers,
    });
  }

  function followUserById(headers, id) {
    return request({
      url: `/user/follow/${id}`,
      requestMethod: "PATCH",
      headers: headers,
    });
  }

  function unfollowUserById(headers, id) {
    return request({
      url: `/user/unfollow/${id}`,
      requestMethod: "PATCH",
      headers: headers,
    });
  }

  function searchByTextInput(headers, data) {
    return request({
      url: `/search/${data}`,
      requestMethod: "GET",
      headers: headers,
    });
  }

  function searchByReference(headers, data, reference) {
    return request({
      url: `/search/${reference}/${data}`,
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
    getFavoritePlaylists: getFavoritePlaylists,
    getPlaylistById: getPlaylistById,
    addSongToPlaylist: addSongToPlaylist,
    editPlaylistById: editPlaylistById,
    deletePlaylistById: deletePlaylistById,
    likePlaylist: likePlaylist,
    dislikePlaylist: dislikePlaylist,
    removeFromPlaylistById: removeFromPlaylistById,
    getUserByUsername: getUserByUsername,
    getFollowedUsersById: getFollowedUsersById,
    followUserById: followUserById,
    unfollowUserById: unfollowUserById,
    searchByTextInput: searchByTextInput,
    searchByReference: searchByReference,
  };
}

export default makeApi();
