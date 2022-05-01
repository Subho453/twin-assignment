const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const path = require("path");
//logging packages
const morgan = require("morgan");
const rfs = require("rotating-file-stream");

const config = require("./config/config");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

// Syncing Db with server
const db = require("./models/index");
db.sequelize.sync();

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "../log"),
});

// setup the logger
const errorResponseFormat = `:remote-addr - :method :url :status - :response-time ms - message: :message`;
morgan.token("message", (req, res) => res.locals.errorStack || "");
app.use(
  morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: accessLogStream,
  })
);

// api routes
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening to port ${config.port}`);
});
