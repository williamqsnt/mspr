const express = require('express');
const router = express.Router();

//controllers de conseil
const afficher = require('../controllers/espece/afficher');

router.get('/afficher', afficher);

module.exports = router;