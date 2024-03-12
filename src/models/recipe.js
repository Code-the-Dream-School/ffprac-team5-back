const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name:{
        type: String,

    },
    preperation:{
        type: String,
    },
    ingredients:{
        type: [String],
    },
    dietarylabels: {
        type: [String],
    },
});

module.exports = mongoose.model('recipe', RecipeSchema);