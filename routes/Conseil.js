const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de conseil
const afficher = require('../controllers/Conseil/afficher');
const ajouter = require('../controllers/Conseil/ajouter');

router.get('/afficher', afficher);
router.post('/ajouter', ajouter);

module.exports = router;