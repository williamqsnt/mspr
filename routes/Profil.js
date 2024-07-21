const express = require('express');
const router = express.Router();
const { afficherProfil } = require('../controllers/Profil/infos');

router.get('/infos', afficherProfil);

module.exports = router;
