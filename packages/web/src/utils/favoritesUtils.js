export function isLiked(id, likedSongs) {
  const index = likedSongs.findIndex((song) => song._id === id);
  return index !== -1;
}

export function isSongInList(id, List) {
  const index = List.findIndex((song) => song._id === id);
  return index !== -1;
}

export function removeFromLikedSongs(id, likedSongs) {
  const index = likedSongs.findIndex((song) => song._id === id);
  likedSongs.splice(index, 1);
  return [...likedSongs];
}

export function addToLikedSongs(song, likedSongs) {
  const index = likedSongs.findIndex((s) => s._id === song._id);
  if (index === -1) {
    return [...likedSongs, song];
  }
  return likedSongs;
}
