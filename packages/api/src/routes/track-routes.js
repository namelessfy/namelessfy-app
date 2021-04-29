const Router = require("express").Router;
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

// my songs endpoints

trackRouter.post(
  "/tracks",
  authMiddleware,
  upload.single("songImage"),
  trackController.createTrack,
);

trackRouter.patch(
  "/tracks/:id",
  authMiddleware,
  upload.single("songImage"),
  trackController.editTrackInfo,
);

trackRouter.get("/tracks", authMiddleware, trackController.getTracks);

trackRouter.delete("/tracks/:id", authMiddleware, trackController.deleteTrack);

// favorite songs endpoints

trackRouter.post(
  "/tracks/favorite/:id",
  authMiddleware,
  trackController.addFavoriteTrack,
);

trackRouter.patch(
  "/tracks/favorite/:id",
  authMiddleware,
  trackController.removeFavoriteTrack,
);

trackRouter.get(
  "/tracks/favorite/:userId",
  authMiddleware,
  trackController.getFavoriteTracks,
);

module.exports = {
  trackRouter,
};
