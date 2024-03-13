const Recipe = require("../models/Recipe");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const searchRecipe = async (req, res) => {
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
