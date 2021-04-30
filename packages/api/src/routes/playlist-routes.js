const Router = require("express").Router;

const { playlistController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const playlistRouter = Router();

// playlistRouter.get(
//   "/playlist",
//   authMiddleware,
//   playlistController.getPlaylists,
// );
// playlistRouter.post(
//   "/playlist",
//   authMiddleware,
//   playlistController.createPlaylists,
// );
// playlistRouter.post(
//   "/playlist/favorite/:id",
//   authMiddleware,
//   playlistController.addFavoritePlaylist,
// );
// playlistRouter.patch(
//   "/playlist/favorite/:id",
//   authMiddleware,
//   playlistController.removeFavoritePlaylist,
// );
// playlistRouter.patch(
//   "/playlist/favorite/:userId",
//   authMiddleware,
//   playlistController.getFavoritePlaylist,
// );
// playlistRouter.delete(
//   "/playlist/:id",
//   authMiddleware,
//   playlistController.deletePlaylist,
// );
// playlistRouter.patch(
//   "/playlist/:id",
//   authMiddleware,
//   playlistController.editPlaylistInfo,
// );

module.exports = { playlistRouter };
