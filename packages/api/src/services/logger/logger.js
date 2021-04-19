const logger = require("loglevel");

logger.enableAll();

const { warn, info, error, trace, debug } = logger;

module.exports = {
  warn,
  info,
  error,
  trace,
  debug,
};
