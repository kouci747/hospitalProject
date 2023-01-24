const express = require('express');
const router = express.Router();
const interventionsController = require('../controllers/interventionsController');

router.post('/addIntervention', interventionsController.addIntervention);

module.exports = router;
