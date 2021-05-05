const Router = require("express").Router;
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const {
  create,
  patchFull,
  getById,
  addToFavorite,
  addToPlaylist,
  removeFromFavorite,
  removeFromPlaylist,
  getFavorites,
  deleteTrack,
} = trackController;

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, upload.single("songImage"), create);

trackRouter.get("/tracks/:userId", authMiddleware, getById);
trackRouter.patch(
  "/tracks/:id",
  authMiddleware,
  upload.single("songImage"),
  patchFull,
);

trackRouter.post("/tracks/favorite/:id", authMiddleware, addToFavorite);
trackRouter.post(
  "/tracks/favorite/playlist/:id",
  authMiddleware,
  addToPlaylist,
);
trackRouter.patch("/tracks/favorite/:id", authMiddleware, removeFromFavorite);
trackRouter.patch(
  "/tracks/favorite/playlist/:id",
  authMiddleware,
  removeFromPlaylist,
);
trackRouter.get("/tracks/favorite/:userId", authMiddleware, getFavorites);

trackRouter.delete("/tracks/:id", authMiddleware, deleteTrack);

module.exports = { trackRouter };
