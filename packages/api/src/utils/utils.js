const { CommonStaticRepository } = require("../repositories");
const USER_COLLECTION = "User";

function orderByLikedBy(a, b, id) {
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
        const options = {
          query: { userName },
          projection: "-__v",
        };
        let user = await CommonStaticRepository.getOne(
          USER_COLLECTION,
          options,
        );

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

function handleResponse(
  res,
  repoResponse,
  successCode = 200,
  errorCode = 503,
  customMessage = {},
) {
  if (repoResponse.data || repoResponse.length >= 0) {
    return res.status(successCode).send({
      data: customMessage.success || repoResponse.data || repoResponse,
      error: null,
    });
  }

  return res.status(errorCode).send({
    data: null,
    error: customMessage.error || repoResponse.error.message,
  });
}

module.exports = { orderByLikedBy, getArtists, orderSongs, handleResponse };
