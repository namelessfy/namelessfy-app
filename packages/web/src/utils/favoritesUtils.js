export function isLiked(id, likedSongs) {
  const index = likedSongs.findIndex((song) => song._id === id);
  return index !== -1;
}

export function isIdInList(id, List) {
  const index = List.findIndex((element) => element._id === id);
  return index !== -1;
}

export function removeFromLikedSongs(id, likedSongs) {
  const favorites = [...likedSongs];
  const index = favorites.findIndex((song) => song._id === id);
  if (index !== -1) {
    favorites.splice(index, 1);
  }
  return [...favorites];
}

export function addToLikedSongs(song, likedSongs) {
  const index = likedSongs.findIndex((s) => s._id === song._id);
  if (index === -1) {
    return [song, ...likedSongs];
  }
  return likedSongs;
}

export function updateEditSong(song, mySongs) {
  const songsList = mySongs;
  const index = mySongs.findIndex((s) => s._id === song._id);
  songsList[index] = song;
  return [...songsList];
}

export function getSongFromList(id, list) {
  const index = list.findIndex((s) => s._id === id);
  if (index === -1) {
    return null;
  }
  return list[index];
}

export function removeFromMySongs(id, mySongs) {
  const index = mySongs.findIndex((song) => song._id === id);
  console.log(mySongs);
  mySongs.splice(index, 1);
  console.log(mySongs);
  return [...mySongs];
}
