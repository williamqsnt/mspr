const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de conversation
const ajouter = require('../controllers/Conversation/ajouter');
const afficher = require('../controllers/Conversation/afficher');

router.post('/ajouter', authorized, ajouter);
router.get('/afficher', authorized, afficher);

module.exports = router;