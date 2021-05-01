const { config } = require("../config");

function errorMiddleware(err, req, res, next) {
  config.logger.debug("Error Handler Middleware: ");
  config.logger.error(err);

  if (req.headersSent) {
    return next(err);
  }

  res.status(500).send({
    data: null,
    error: "Something went wrong",
  });
}

module.exports = {
  errorMiddleware,
};
