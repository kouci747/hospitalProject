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

//GET : http://localhost:9000/api/v1/intervention/getMostUsedOperatingRoom
router.get(
  '/getMostUsedOperatingRoom',
  interventionsController.getMostUsedOperatingRoom
);

//test
router.get('/getAnest', interventionsController.getAnest);

//retourne l'intervention la plus fréquentée du chirurgien
router.get(
  '/getMostFreqIntervention',
  interventionsController.getMostFreqIntervention
);

//favorite nurse1 : GET http://localhost:9000/api/v1/intervention/getMostCommonNurse1
router.get('/getMostCommonNurse1', interventionsController.getMostCommonNurse1);

//favorite nurse2 : GET http://localhost:9000/api/v1/intervention/getMostCommonNurse2
router.get('/getMostCommonNurse2', interventionsController.getMostCommonNurse2);

//barre de recherche pour trouver un médecin
router.get(
  '/findAllSurgeonInterventionsByName',
  interventionsController.findAllSurgeonInterventionsByName
);

//
router.get(
  '/mostCommunNurseOneAndTwo',
  interventionsController.mostCommunNurseOneAndTwo
);

router.get('/resultatTri', interventionsController.resultatTri);
module.exports = router;
