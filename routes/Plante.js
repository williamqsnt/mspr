const express = require('express');
const router = express.Router();

const authorized = require('../middleware/authorized');

//controllers de plante
const afficher = require('../controllers/Plante/afficher');
const afficherAll = require('../controllers/Plante/afficherAll');
const afficherAllByUtilisateur = require('../controllers/Plante/afficherAllByUtilisateur');
const ajouter = require('../controllers/Plante/ajouter');
const recupererLocalisation = require('../controllers/Plante/recupererLocalisation');
const modifier = require('../controllers/Plante/modifier');
const supprimer = require('../controllers/Plante/supprimer');

router.get('/afficher', authorized, afficher);
router.get('/afficherAll', authorized, afficherAll);
router.get('/afficherAllByUtilisateur', authorized, afficherAllByUtilisateur);
router.post('/ajouter', authorized, ajouter);
router.get('/recupererLocalisation', authorized, recupererLocalisation);
router.put('/modifier', authorized, modifier);
router.delete('/supprimer', authorized, supprimer);

module.exports = router;