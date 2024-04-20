const express = require("express");
const { auth } = require("../middleware/authentication");
const router = express.Router();

const {
  createRecipe,
  searchRecipes,
  getRecipe,
  getAllRecipes,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeController");

router.route("/").post(auth, createRecipe);
router.route("/").get(getAllRecipes);
router.route("/search").get(searchRecipes);
router
  .route("/:id")
  .get(getRecipe)
  .delete(auth, deleteRecipe)
  .patch(auth, updateRecipe);

module.exports = router;
