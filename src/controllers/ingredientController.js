const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Ingredients = require("../models/ingredient");

const getIngredients = async(req, res) => {
    try {
        searchTerm = req.query.name
        const ingredients = await Ingredients.find({ name: { $regex: searchTerm, $options: 'i' } });
        res.status(StatusCodes.OK).json(ingredients);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Could not fetch ingredients" });
    }

}

const addIngredients = async (req, res) => {
    try {
        Term = req.query.name
        const ingredients = await Ingredients.create( {name: Term})
        res.status(StatusCodes.OK).json(ingredients);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getIngredients, 
    addIngredients
};
