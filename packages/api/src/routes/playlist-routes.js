// const Router = require("express").Router;

// const { playlistController } = require("../controllers");
// const { authMiddleware } = require("../middlewares");

// const playlistRouter = Router();

// playlistRouter.get(
//   "/playlist",
//   authMiddleware,
//   playlistController.getPlaylists,
// );
// playlistRouter.post("/playlist", playlistController.createPlaylists);

// // trackRouter.post("/tracks", authMiddleware, trackController.createTrack);
// // trackRouter.get("/tracks", trackController.getTracks);
// // trackRouter.post(
// //   "/tracks/favorite/:id",
// //   authMiddleware,
// //   trackController.addFavoriteTrack,
// // );
// // trackRouter.patch(
// //   "/tracks/favorite/:id",
// //   authMiddleware,
// //   trackController.removeFavoriteTrack,
// // );
// // trackRouter.get(
// //   "/tracks/favorite/:userId",
// //   authMiddleware,
// //   trackController.getFavoriteTracks,
// // );
// // trackRouter.delete("/tracks/:id", authMiddleware, trackController.deleteTrack);
// // trackRouter.patch("/tracks/:id", authMiddleware, trackController.editTrackInfo);

// module.exports = {
//   playlistRouter,
// };
