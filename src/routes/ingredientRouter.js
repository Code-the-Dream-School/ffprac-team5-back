const express = require("express");

const router = express.Router();
const {
    getIngredients, 
    addIngredients
} = require("../controllers/ingredientController")

router.route("/").get(getIngredients).post(addIngredients);

module.exports = router;
