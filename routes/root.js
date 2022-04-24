const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => { //find first route
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html')); //another way to serve file
});

module.exports = router; 