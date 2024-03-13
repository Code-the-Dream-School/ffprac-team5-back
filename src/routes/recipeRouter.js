const express = require("express");

const router = express.Router();

const {
  createRecipe,
  searchRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipe");

router.route("/recipe/:id").post(createRecipe);
router.route("/receipe/search").get(searchRecipes);
router
  .route("/recipe/:id")
  .get(getRecipe)
  .delete(deleteRecipe)
  .patch(updateRecipe);

module.exports = router;
