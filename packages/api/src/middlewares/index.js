const { authMiddleware } = require("./auth-middleware");
const { errorMiddleware } = require("./error-middleware");
const { validateUserMiddleware } = require("./editUser-middleware");

module.exports = {
  authMiddleware: authMiddleware,
  errorMiddleware: errorMiddleware,
  validateUserMiddleware: validateUserMiddleware,
};
