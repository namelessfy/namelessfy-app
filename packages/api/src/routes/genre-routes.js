const Router = require("express").Router;

const { genreController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const genreRouter = Router();

genreRouter.get("/genre", authMiddleware, genreController.getGenres);
genreRouter.post("/genre", authMiddleware, genreController.createGenres);

genreRouter.patch("/genre", authMiddleware, genreController.updateGenreByName);

module.exports = { genreRouter };
