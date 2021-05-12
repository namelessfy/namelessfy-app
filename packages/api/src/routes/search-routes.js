const Router = require("express").Router;

const { searchController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const {
  getByNameFromAllCollections,
  getAllTrackReferences,
  getAllPlaylistReferences,
  getAllGenreReferences,
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

module.exports = { searchRouter };
