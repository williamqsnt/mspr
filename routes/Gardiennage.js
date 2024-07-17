const express = require('express');
const router = express.Router();

const authorized = require('../middleware/authorized');

//controllers de gardiennage
const afficherGardes = require('../controllers/Gardiennage/afficherGardes');
const ajouter = require('../controllers/Gardiennage/ajouter');
const ajouterGardien = require('../controllers/Gardiennage/ajouterGardien');

router.get('/afficherGardes', authorized, afficherGardes);
router.post('/ajouter', authorized, ajouter);
router.put('/ajouterGardien', authorized, ajouterGardien);

module.exports = router;