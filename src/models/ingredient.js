const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        number: {
            type: Number
        },
        unit: {
            type: String
        },
    }   
)

module.exports = mongoose.model("ingredients", ingredientSchema);
