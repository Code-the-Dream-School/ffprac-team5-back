const Recipe = require("../models/recipe");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(StatusCodes.CREATED).json({ recipe });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Could not save recipe" });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const {
      query: { term: searchterm },
    } = req;
    //const queryRegx = new RegExp(searchterm, "i");
    // const recipes = await Recipe.find({
    //   $or: [
    //     { preperation: { $regex: queryRegx } },
    //     { ingredients: { $regex: queryRegx } },
    //     { dietarylabels: { $regex: queryRegx } },
    //   ],
    // });
    // await Recipe.ensureIndex({
    //   preperation: "text",
    //   ingredients: "text",
    //   dietarylabels: "text",
    // });
    // let recipes = await Recipe.find({ $text: { $search: searchterm } });
    // if (recipes && recipes.length > 0) {
    //   console.log(recipes);
    //   //recipes = recipes.toArray();
    // }
    // let recipes = await Recipe.aggregate([
    //   {
    //     $search: {
    //       phrase: {
    //         query: searchterm.split(" "),
    //         path: ["preperation", "ingredients"],
    //       },
    //     },
    //   },
    // ]);
    let recipes = await Recipe.aggregate([
      { $match: { $text: { $search: searchterm } } },
    ]);
    //let recipes = await Recipe.find({ $or: QStringIng.concat(QStringDiet) });

    if (!recipes) {
      throw new NotFoundError(` No Recipe with term ${params.term}`);
    }
    res.status(StatusCodes.OK).json({ recipes });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Could not fetch recipes" });
  }
};

const getRecipe = async (req, res) => {
  try {
    const {
      params: { id: recipeId },
    } = req;
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      throw new NotFoundError(` No recipe with id ${recipeId}`);
    }
    res.status(StatusCodes.OK).json({ recipe });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Could not fetch recipes" });
  }
};

const deleteRecipe = async (req, res) => {
  const {
    params: { id: recipeId },
  } = req;
  try {
    const recipe = await Recipe.findByIdAndDelete(recipeId);
    if (!recipe) {
      throw new NotFoundError(` No recipe with id ${recipeId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Deletion failed" });
  }
};

const updateRecipe = async (req, res) => {
  const {
    body: { preparation, ingredients, dietarylabels },
    params: { id: recipeId },
  } = req;
  if (!preparation || !ingredients || !dietarylabels) {
    throw new BadRequestError(
      "preparation / ingredients / dietarylabels cannot be empty"
    );
  }
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: recipeId },
      {
        preparation: req.body.preparation,
        ingredients: req.body.ingredients,
        dietarylabels: req.body.dietarylabels,
      },
      { new: true, runValidators: true }
    );

    if (!recipe) {
      throw new NotFoundError(` No recipe with id ${recipeId}`);
    }
    res.status(StatusCodes.OK).json({ recipe });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Update failed" });
  }
};

module.exports = {
  createRecipe,
  searchRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
};
