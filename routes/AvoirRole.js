const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers d'avoirRole
const ajouter = require('../controllers/AvoirRole/ajouter');
const supprimer = require('../controllers/AvoirRole/supprimer');

router.post('/ajouter', ajouter);
router.delete('/supprimer', supprimer);

module.exports = router;