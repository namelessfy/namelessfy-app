export function isLiked(id, likedSongs) {
  const index = likedSongs.findIndex((song) => song._id === id);
  return index !== -1;
}

export function isIdInList(id, list) {
  const index = list.findIndex((element) => element._id === id);
  return index !== -1;
}

export function removeFromLikedSongs(id, likedSongs) {
  const favorites = [...likedSongs];
  const index = likedSongs.findIndex((song) => song._id === id);
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
  const index = songsList.findIndex((s) => s._id === song._id);
  if (index !== -1) {
    songsList[index] = song;
  }
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
  mySongs.splice(index, 1);
  return [...mySongs];
}

export function addSongToLastPlayed(song, list) {
  if (list) {
    let lastPlayed = [...list];
    const index = lastPlayed.findIndex((item) => item._id === song._id);

    if (index !== -1) {
      lastPlayed.splice(index, 1);
    }

    lastPlayed = [song, ...lastPlayed];

    lastPlayed = lastPlayed.slice(0, 20);

    return lastPlayed;
  }
  return [song];
}
