const Router = require("express").Router;

const { playlistController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const {
  create,
  getByIdAndPrivacy,
  getFavorites,
  patchFull,
  addToFavorite,
  removeFromFavorite,
  addTrack,
  removeTrack,
  deletePlaylist,
} = playlistController;

const playlistRouter = Router();

playlistRouter.post("/playlist", authMiddleware, create);

playlistRouter.get("/playlist", authMiddleware, getByIdAndPrivacy);
playlistRouter.get("/playlist/favorite/:userId", authMiddleware, getFavorites);

playlistRouter.patch("/playlist/:id", authMiddleware, patchFull);
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
playlistRouter.patch("/playlist/track/add/:id", authMiddleware, addTrack);
playlistRouter.patch("/playlist/track/remove/:id", authMiddleware, removeTrack);

playlistRouter.delete("/playlist/:id", authMiddleware, deletePlaylist);

module.exports = { playlistRouter };
