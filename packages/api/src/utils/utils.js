function orderFavoriteSongs(a, b, id) {
  const one = a.likedBy.find((s) => s._id.toString() === id.toString());
  const two = b.likedBy.find((s) => s._id.toString() === id.toString());

  if (one.time < two.time) {
    return 1;
  }
  if (one.time > two.time) {
    return -1;
  }
  return 0;
}

module.exports = { orderFavoriteSongs };
