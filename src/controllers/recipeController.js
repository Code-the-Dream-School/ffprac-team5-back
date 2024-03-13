const Recipe = require("../models/recipe");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createRecipe = async (req, res) => {
  res.status(StatusCodes.OK).json({ recipes });
};

const searchRecipes = async (req, res) => {
  const {
    params: { term: searchterm },
  } = req;
  const queryRegx = new RegExp(params.term, "i");
  const recipes = await Recipe.find({
    $or: [
      { howtoprepare: { $regex: queryRegx } },
      { ingredients: { $regex: queryRegx } },
      { dietlabels: { $regex: queryRegx } },
    ],
  }).toArray();

  if (!recipes) {
    throw new NotFoundError(` No Recipe with term ${params.term}`);
  }
  console.log(recipes);
  res.status(StatusCodes.OK).json({ recipes });
};

const getRecipe = async (req, res) => {
  res.status(StatusCodes.OK).json({ recipes });
};

const deleteRecipe = async (req, res) => {
  res.status(StatusCodes.OK).json({ recipes });
};

const updateRecipe = async (req, res) => {
  res.status(StatusCodes.OK).json({ recipes });
};

module.exports = {
  createRecipe,
  searchRecipes,
  getRecipe,
  deleteRecipe,
  updateRecipe,
};
