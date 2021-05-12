const Router = require("express").Router;

const { searchController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const {
  getByNameFromAllCollections,
  getAllTrackReferences,
  getAllPlaylistReferences,
  getAllGenreReferences,
  getAllUserReferences,
} = searchController;

const searchRouter = Router();

searchRouter.get(
  "/search/:search",
  authMiddleware,
  getByNameFromAllCollections,
);
searchRouter.get(
  "/search/track/:search",
  authMiddleware,
  getAllTrackReferences,
);
searchRouter.get(
  "/search/playlist/:search",
  authMiddleware,
  getAllPlaylistReferences,
);
searchRouter.get(
  "/search/genre/:search",
  authMiddleware,
  getAllGenreReferences,
);
searchRouter.get("/search/user/:search", authMiddleware, getAllUserReferences);

module.exports = { searchRouter };
