const UserRepository = require("./user-repository");
const TrackRepository = require("./track-repository");
const PlaylistRepository = require("./playlist-repository");

module.exports = {
  UserRepo: UserRepository,
  TrackRepo: TrackRepository,
  PlaylistRepo: PlaylistRepository,
};
