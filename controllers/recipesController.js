const Recipe = require('../model/Recipe');

const getAllRecipes = async (req, res) => { 
    const recipes = await Recipe.find();
    if(!recipes) return res.status(204).json({'message': 'No recipes found. '});
    res.json(recipes);
}

const createNewRecipe = async (req, res) => {
    if (!req?.body?.name || !req?.body?.type) {
        return res.status(400).json({ 'message': 'Name and type are required. ' });
    }

    try {
        const result = await Recipe.create({
            name: req.body.name,
            type: req.body.type
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateRecipe = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const recipe = await Recipe.findOne({ _id: req.body.id }).exec();
    if (!recipe) {
        return res.status(204).json({ "message": `No recipe matches ID ${req.body.id}.` });
    }
    if (req.body?.name) recipe.name = req.body.name;
    if (req.body?.type) recipe.type = req.body.type;
    const result = await recipe.save();
    res.json(result);
}

const deleteRecipe = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Recipe ID required.' });

    const recipe = await Recipe.findOne({ _id: req.body.id }).exec();
    if (!recipe) {
        return res.status(204).json({ "message": `No recipe matches ID ${req.body.id}.` });
    }
    const result = await recipe.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getRecipe = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Recipe ID required.' });

    const recipe = await Recipe.findOne({ _id: req.params.id }).exec();
    if (!recipe) {
        return res.status(204).json({ "message": `No recipe matches ID ${req.params.id}.` });
    }
    res.json(recipe);
}

module.exports = {
    getAllRecipes,
    createNewRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe
}
