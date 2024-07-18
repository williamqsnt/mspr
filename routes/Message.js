const express = require('express');
const router = express.Router();

const authorized = require('../middleware/auth');

//controllers de message
const ajouter = require('../controllers/Message/ajouter');
const recupererAll = require('../controllers/Message/recupererAll');

router.post('/ajouter', ajouter);
router.get('/recupererAll', recupererAll);

module.exports = router;