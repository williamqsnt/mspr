const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de conversation
const ajouter = require('../controllers/Conversation/ajouter');
const afficher = require('../controllers/Conversation/afficher');

router.post('/ajouter', ajouter);
router.get('/afficher', afficher);

module.exports = router;