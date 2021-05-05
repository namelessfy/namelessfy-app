const Router = require("express").Router;

const { genreController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const {
  create,
  getByName,
  getAll,
  getByTrackName,
  updateTracksByName,
} = genreController;

const genreRouter = Router();

genreRouter.post("/genre", authMiddleware, create);
genreRouter.get("/genre", authMiddleware, getAll);
genreRouter.get("/genre/:name", authMiddleware, getByName);
genreRouter.get("/genre/track/:trackName", authMiddleware, getByTrackName);
genreRouter.patch("/genre", authMiddleware, updateTracksByName);

module.exports = { genreRouter };
