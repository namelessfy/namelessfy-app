const Router = require("express").Router;
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

const {
	createTrack,
	getTracks,
	editTrackInfo,
	deleteTrack,
	addFavoriteTrack,
	removeFavoriteTrack,
	getFavoriteTracks
} = trackController;

trackRouter.post("/tracks", authMiddleware, upload.single("songImage"), createTrack);

trackRouter.get("/tracks/:userId", authMiddleware, getTracks);
trackRouter.patch("/tracks/:id", authMiddleware, upload.single("songImage"), editTrackInfo);
trackRouter.delete("/tracks/:id", authMiddleware, deleteTrack);

trackRouter.post("/tracks/favorite/:id", authMiddleware, addFavoriteTrack);
trackRouter.patch("/tracks/favorite/:id", authMiddleware, removeFavoriteTrack);
trackRouter.get("/tracks/favorite/:userId", authMiddleware, getFavoriteTracks);

module.exports = { trackRouter };
