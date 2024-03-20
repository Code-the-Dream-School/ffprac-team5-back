const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Ingredients = require("../models/ingredient");

const getIngredients = async(req, res) => {
    try {
        const ingredients = await Ingredients.find()
        res.status(StatusCodes.OK).json(ingredients);
    } catch (error) {
        console.log(e);
        res.status(500).json({ msg: "Could not fetch ingredients" });
    }

}

module.exports = getIngredients;
