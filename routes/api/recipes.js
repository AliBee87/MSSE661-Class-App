const express = require('express');
const router = express.Router();
const recipesController = require('../../controllers/recipesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/') //chain HTTP methods together to come in through same route
    .get(verifyRoles(ROLES_LIST.Admin), recipesController.getAllRecipes)
    .delete(verifyRoles(ROLES_LIST.Admin), recipesController.deleteRecipe);

    router.route('/:id') //parameter directly in URL. Get request that has parameter inside URL
        .get(recipesController.getRecipe);

module.exports = router; 