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

searchRouter.get("/search", authMiddleware, getByNameFromAllCollections);
searchRouter.get("/search/track", authMiddleware, getAllTrackReferences);
searchRouter.get("/search/playlist", authMiddleware, getAllPlaylistReferences);
searchRouter.get("/search/genre", authMiddleware, getAllGenreReferences);

module.exports = { searchRouter };
