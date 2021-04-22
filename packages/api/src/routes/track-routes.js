const Router = require("express").Router;

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, trackController.createTrack);
trackRouter.get("/tracks", authMiddleware, trackController.getTracks);
trackRouter.post(
  "/tracks/favorite/:id",
  authMiddleware,
  trackController.addFavoriteTrack,
);
trackRouter.get(
  "/tracks/favorite/:userId",
  authMiddleware,
  trackController.getFavoriteTracks,
);

module.exports = {
  trackRouter: trackRouter,
};
