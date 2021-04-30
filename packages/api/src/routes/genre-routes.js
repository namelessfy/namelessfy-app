const Router = require("express").Router;

// const { genreController } = require("../controllers");
// const { authMiddleware } = require("../middlewares");

const genreRouter = Router();

// genreRouter.get(
//     "/genre",
//     authMiddleware,
//     genreController.getGenres,
// );
// genreRouter.post(
//     "/genre",
//     authMiddleware,
//     genreController.createGenres,
// );
// genreRouter.post(
//     "/genre/favorite/:id",
//     authMiddleware,
//     genreController.addFavoriteGenre,
// );
// genreRouter.patch(
//     "/genre/favorite/:id",
//     authMiddleware,
//     genreController.removeFavoriteGenre,
// );
// genreRouter.patch(
//     "/genre/favorite/:userId",
//     authMiddleware,
//     genreController.getFavoriteGenre,
// );

module.exports = { genreRouter };
