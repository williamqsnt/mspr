const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers d'utilisateur
const ajouter = require('../controllers/Utilisateur/ajouter');
const recupererId = require('../controllers/Utilisateur/recupererId');
const recuperPseudo = require('../controllers/Utilisateur/recupererPseudo');
const supprimer = require('../controllers/Utilisateur/supprimer');
const verifier = require('../controllers/Utilisateur/verifier');

router.post('/ajouter', ajouter);
router.get('/recupererId', recupererId);
router.get('/recupererPseudo', recuperPseudo);
router.delete('/supprimer', supprimer);
router.post('/verifier', verifier);

module.exports = router;