const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de gardiennage
const afficherGardes = require('../controllers/Gardiennage/afficherGardes');
const ajouter = require('../controllers/Gardiennage/ajouter');
const ajouterGardien = require('../controllers/Gardiennage/ajouterGardien');

router.get('/afficherGardes', afficherGardes);
router.post('/ajouter', ajouter);
router.put('/ajouterGardien', ajouterGardien);

module.exports = router;