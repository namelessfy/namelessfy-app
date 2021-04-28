const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");

const { config } = require("./config");
const { errorMiddleware } = require("./middlewares");
const {
  userRouter,
  healthRouter,
  trackRouter,
  playlistRouter,
} = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors({ origin: config.client.url }));

app.use(userRouter);
app.use(healthRouter);
app.use(trackRouter);
app.use(playlistRouter);

app.use(errorMiddleware);

module.exports = { app };
