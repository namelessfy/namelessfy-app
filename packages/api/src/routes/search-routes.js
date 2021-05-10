const Router = require("express").Router;

const { searchController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const { getByNameFromAllCollections } = searchController;

const searchRouter = Router();

searchRouter.get("/search", authMiddleware, getByNameFromAllCollections);

module.exports = { searchRouter };
