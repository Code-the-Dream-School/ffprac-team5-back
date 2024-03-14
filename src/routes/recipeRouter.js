const express = require("express");

const router = express.Router();

const {
  createRecipe,
  searchRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeController");

router.route("/:id").post(createRecipe);
router.route("/search").get(searchRecipes);
router.route("/:id").get(getRecipe).delete(deleteRecipe).patch(updateRecipe);

module.exports = router;
