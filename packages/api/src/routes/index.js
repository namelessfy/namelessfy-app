const { userRouter } = require("./user-routes");
const { healthRouter } = require("./health-routes");
const { trackRouter } = require("./track-routes");

module.exports = {
  userRouter,
  healthRouter,
  trackRouter,
};
