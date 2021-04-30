const UserRepository = require("./user-repository");

const AbstractRepository = require("./AbstractRepository");


module.exports = {
  UserRepo: UserRepository,
  TrackRepo: new AbstractRepository("Track"),
  PlaylistRepo: new AbstractRepository("Playlist"),
  GenreRepo: new AbstractRepository("Genre"),
};
