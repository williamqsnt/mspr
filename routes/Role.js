const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de role
const ajouter = require('../controllers/Role/ajouter');
const modifier = require('../controllers/Role/modifier');
const supprimer = require('../controllers/Role/supprimer');

router.post('/ajouter', ajouter);
router.put('/modifier', modifier);
router.delete('/supprimer', supprimer);

module.exports = router;