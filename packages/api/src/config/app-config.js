require("dotenv").config();

const { warn, info, error, trace, debug } = require("../services").logger;

const {
  NODE_ENV = "development",
  MONGO_DB_URL_PRODUCTION,
  MONGO_DB_URL_DEVELOPMENT,
  MONGO_DB_URL_TEST,
  PORT = 4000,
} = process.env;

const baseConfig = {
  app: {
    port: PORT || 4000,
  },
  client: {
    url: process.env.CLIENT_URL,
  },
  logger: {
    warn,
    info,
    error,
    trace,
    debug,
  },
};

const config = {
  development: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
  },
  test: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_TEST,
    },
  },
  production: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
  },
};

module.exports = {
  config: config[NODE_ENV],
};
