const { UserRepo } = require("../repositories");

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

function orderSongs(a, b) {
  const one = a.createdAt;
  const two = b.createdAt;
  if (one < two) {
    return 1;
  }
  if (one > two) {
    return -1;
  }
  return 0;
}

async function getArtists(array) {
  let artists = [];
  await Promise.all(
    array.map(async ({ userName }) => {
      try {
        let user = await UserRepo.findOne({ userName });
        if (user.error) {
          throw new Error(user.error);
        }
        artists.push({
          _id: user.data._id,
          userName,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  );
  return artists;
}

module.exports = { orderFavoriteSongs, getArtists, orderSongs };
