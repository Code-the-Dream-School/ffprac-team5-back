const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        number: {
            type: Number
        },
    }   
)

module.exports = mongoose.model("ingredients", ingredientSchema);
