const { userRouter } = require("./user-routes");
const { healthRouter } = require("./health-routes");
const { trackRouter } = require("./track-routes");
const { playlistRouter } = require("./playlist-routes");
const { genreRouter } = require("./genre-routes");
const { searchRouter } = require("./search-routes");

module.exports = {
  userRouter,
  healthRouter,
  trackRouter,
  playlistRouter,
  genreRouter,
  searchRouter,
};
