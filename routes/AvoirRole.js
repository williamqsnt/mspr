const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers d'avoirRole
const ajouter = require('../controllers/AvoirRole/ajouter');
const supprimer = require('../controllers/AvoirRole/supprimer');

router.post('/ajouter', authorized, ajouter);
router.delete('/supprimer', authorized, supprimer);

module.exports = router;