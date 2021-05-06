const Router = require("express").Router;
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const { playlistController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const {
  create,
  getFavoritePlaylists,
  getOnePlaylist,
  editPlaylistInfo,
  addToFavorite,
  removeFromFavorite,
  removeTrack,
  deletePlaylist,
  addSongToPlaylist,
} = playlistController;

const playlistRouter = Router();

playlistRouter.post(
  "/playlist",
  authMiddleware,
  upload.single("playlistImage"),
  create,
);
playlistRouter.get(
  "/playlist/favorite/:id",
  authMiddleware,
  getFavoritePlaylists,
);
playlistRouter.get("/playlist/:playlistId", authMiddleware, getOnePlaylist);

playlistRouter.patch(
  "/playlist/:id",
  authMiddleware,
  upload.single("playlistImage"),
  editPlaylistInfo,
);

playlistRouter.patch(
  "/playlist/favorite/add/:id",
  authMiddleware,
  addToFavorite,
);
playlistRouter.patch(
  "/playlist/favorite/remove/:id",
  authMiddleware,
  removeFromFavorite,
);

playlistRouter.patch("/playlist/:id/add", authMiddleware, addSongToPlaylist);
playlistRouter.patch("/playlist/:id/remove", authMiddleware, removeTrack);

playlistRouter.delete("/playlist/:id", authMiddleware, deletePlaylist);

module.exports = { playlistRouter };
