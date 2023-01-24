const express = require('express');
const router = express.Router();
const interventionsController = require('../controllers/interventionsController');

//POST : http://localhost:9000/api/v1/intervention/addIntervention
router.post('/addIntervention', interventionsController.addIntervention);

//GET : http://localhost:9000/api/v1/intervention/getInterventions
router.get('/getInterventions', interventionsController.getAllInterventions);

//GET
router.get(
  '/getFilteredInterventions',
  interventionsController.getFilteredInterventions
);

module.exports = router;
