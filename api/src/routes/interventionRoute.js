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

//GET http://localhost:9000/api/v1/intervention/getAnest
//l'anesth. avec lequel un chirurgien a le + travaillé. ex: Dr ORNE avec HAYHN.
router.get('/getAnest', interventionsController.getAnest);

//retourne l'intervention la plus fréquentée du chirurgien GET : http://localhost:9000/api/v1/intervention/getMostFreqIntervention
router.get(
  '/getMostFreqIntervention',
  interventionsController.getMostFreqIntervention
);

//favorite nurse1 : GET http://localhost:9000/api/v1/intervention/getMostCommonNurse1
router.get('/getMostCommonNurse1', interventionsController.getMostCommonNurse1);

//favorite nurse2 : GET http://localhost:9000/api/v1/intervention/getMostCommonNurse2
router.get('/getMostCommonNurse2', interventionsController.getMostCommonNurse2);

//barre de recherche pour trouver un médecin GET http://localhost:9000/api/v1/intervention/findAllSurgeonInterventionsByName
// JSON body : {"surgeonName":"DARIA"}
router.get(
  '/findAllSurgeonInterventionsByName',
  interventionsController.findAllSurgeonInterventionsByName
);

// GET : http://localhost:9000/api/v1/intervention/mostCommunNurseOneAndTwo
router.get(
  '/mostCommunNurseOneAndTwo',
  interventionsController.mostCommunNurseOneAndTwo
);

// GET : http://localhost:9000/api/v1/intervention/allNursesForOneSurgeon
router.get(
  '/allNursesForOneSurgeon',
  interventionsController.allNursesForOneSurgeon
);
//router.get('/resultatTri', interventionsController.resultatTri); //revoir
module.exports = router;
