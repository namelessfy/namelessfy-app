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
  genreRouter,
  searchRouter,
} = require("./routes");

const app = express();

app.options("*", cors());

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: config.client.url,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  }),
);

app.use(userRouter);
app.use(healthRouter);
app.use(trackRouter);
app.use(playlistRouter);
app.use(genreRouter);
app.use(searchRouter);

app.use(errorMiddleware);

module.exports = { app };
