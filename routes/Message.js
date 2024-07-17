const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de message
const ajouter = require('../controllers/Message/ajouter');
const ajouterImage = require('../controllers/Message/ajouterImage');
const recupererAll = require('../controllers/Message/recupererAll');

router.post('/ajouter', authorized, ajouter);
router.post('/ajouterImage', authorized, ajouterImage);
router.get('/recupererAll', authorized, recupererAll);

module.exports = router;