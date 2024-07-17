const express = require('express');
const router = express.Router();

const authorized = require('../middleware/authorized');

//controllers de role
const ajouter = require('../controllers/Role/ajouter');
const modifier = require('../controllers/Role/modifier');
const supprimer = require('../controllers/Role/supprimer');

router.post('/ajouter', authorized, ajouter);
router.put('/modifier', authorized, modifier);
router.delete('/supprimer', authorized, supprimer);

module.exports = router;