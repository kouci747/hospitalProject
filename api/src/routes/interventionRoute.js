const express = require('express');
const router = express.Router();
const interventionsController = require('../controllers/interventionsController');

//POST : http://localhost:9000/api/v1/intervention/addIntervention
router.post('/addIntervention', interventionsController.addIntervention);

//GET : http://localhost:9000/api/v1/intervention/getInterventions
router.get('/getInterventions', interventionsController.getAllInterventions);

//GET :  http://localhost:9000/api/v1/intervention/getFilteredInterventions
router.get(
  '/getSurgeonsByNumberOfInterventions',
  interventionsController.getSurgeonsByNumberOfInterventions
);

//GET : http://localhost:9000/api/v1/intervention/CoupleSurgeonAnesthesist
router.get(
  '/CoupleSurgeonAnesthesist',
  interventionsController.getGroupsOfSurgeonsAndAnesthesist
);

//test
router.get('/getAnest', interventionsController.getAnest);
module.exports = router;
