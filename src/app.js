const express = require("express");
const app = express();
const cors = require("cors");
const favicon = require("express-favicon");
const logger = require("morgan");
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
// routes
app.get("/", (req, res) => {
  res.status(200).json({
    data: "This is a full stack app!",
  });
});
app.use("/api/v1", mainRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/recipe", recipeRouter);
app.use("/api/v1/ingredients", ingredientRouter);

module.exports = app;
