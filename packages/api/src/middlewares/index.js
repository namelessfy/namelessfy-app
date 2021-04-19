const { authMiddleware } = require("./auth-middleware");
const { errorMiddleware } = require("./error-middleware");
const { validationUserMiddleware } = require("./editUser-middleware");

module.exports = {
  authMiddleware: authMiddleware,
  errorMiddleware: errorMiddleware,
  validationUserMiddleware: validationUserMiddleware,
};
