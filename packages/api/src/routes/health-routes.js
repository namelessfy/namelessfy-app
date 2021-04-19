const { Router } = require("express");

const { healthController } = require("../controllers");

const healthRouter = Router();

healthRouter.get("/healthcheck", healthController.checkServerStatus);

module.exports = { healthRouter };
