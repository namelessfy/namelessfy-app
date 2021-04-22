const Router = require("express").Router;

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, trackController.createTrack);
trackRouter.get("/tracks", authMiddleware, trackController.getTracks);

module.exports = {
  trackRouter: trackRouter,
};
