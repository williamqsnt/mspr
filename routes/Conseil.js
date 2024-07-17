const express = require('express');
const router = express.Router();

const authorized = require('../middleware/authorized');

//controllers de conseil
const afficher = require('../controllers/Conseil/afficher');
const ajouter = require('../controllers/Conseil/ajouter');

router.get('/afficher', authorized, afficher);
router.post('/ajouter', authorized, ajouter);

module.exports = router;