const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');

router.post('/', updateController.updateUser);

module.exports = router;
