const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de plante
const afficher = require('../controllers/Plante/afficher');
const afficherAll = require('../controllers/Plante/afficherAll');
const afficherAllByUtilisateur = require('../controllers/Plante/afficherAllByUtilisateur');
const ajouter = require('../controllers/Plante/ajouter');
const recupererLocalisation = require('../controllers/Plante/recupererLocalisation');
const modifier = require('../controllers/Plante/modifier');
const supprimer = require('../controllers/Plante/supprimer');

router.get('/afficher', afficher);
router.get('/afficherAll', afficherAll);
router.get('/afficherAllByUtilisateur', afficherAllByUtilisateur);
router.post('/ajouter', ajouter);
router.get('/recupererLocalisation', recupererLocalisation);
router.put('/modifier', modifier);
router.delete('/supprimer', supprimer);

module.exports = router;