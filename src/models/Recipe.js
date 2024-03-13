const mongoose = require("mongoose");
const RecipeSchema = new mongoose.Schema(
  {
    name: String,
    howtoprepare: String,
    ingredients: [String],
    dietlabels: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
