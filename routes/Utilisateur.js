const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers d'utilisateur
const ajouter = require('../controllers/Utilisateur/ajouter');
const recupererId = require('../controllers/Utilisateur/recupererId');
const recuperer = require('../controllers/Utilisateur/recuperer');
const recuperPseudo = require('../controllers/Utilisateur/recupererPseudo');
const supprimer = require('../controllers/Utilisateur/supprimer');
const verifier = require('../controllers/Utilisateur/verifier');
const estBotaniste = require('../controllers/Utilisateur/estBotaniste');

router.post('/ajouter', ajouter);
router.get('/recuperer', recuperer);
router.get('/recupererId', recupererId);
router.get('/recupererPseudo', recuperPseudo);
router.get('/estBotaniste', estBotaniste);
router.delete('/supprimer', supprimer);
router.post('/verifier', verifier);

module.exports = router;