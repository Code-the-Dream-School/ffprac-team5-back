const express = require("express");
const app = express();
const cors = require("cors");
const favicon = require("express-favicon");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();


//swagger
const swagger = require("swagger-ui-express");

// middleware
app.use(cors());
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

//routes import
const userRouter = require("./routes/userRouter");
const recipeRouter = require("./routes/recipeRouter");
const authRouter = require("./routes/authRouter");
const ingredientRouter = require("./routes/ingredientRouter.js");

const mainRouter = require("./routes/mainRouter.js");
const { NotFoundError } = require("./errors");

//rate limiter
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // limit each IP to 60 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    data: "This is a full stack app!",
  });
});
app.use("/api/v1", limiter, mainRouter);
app.use("/api/v1/auth", limiter, authRouter);
app.use("/api/v1/user", limiter, userRouter);
app.use("/api/v1/recipe", limiter, recipeRouter);
app.use("/api/v1/ingredients", limiter, ingredientRouter);
//catch all else route
app.use("*", (_, res) => {
  res.status(404).send("Not Found");
});

module.exports = app;
