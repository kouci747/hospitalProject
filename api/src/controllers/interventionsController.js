const Intervention = require('../models/Interventions.js');

//permet d'ajouter une nouvelle entrée au tableau des interventions
exports.addIntervention = (req, res) => {
  const newIntervention = new Intervention({
    surgeon: req.body.surgeon,
    speciality: req.body.speciality,
    anesthsiste: req.body.anesthsiste,
    nurse1: req.body.nurse1,
    nurse2: req.body.nurse2,
    roomNumber: req.body.roomNumber,
    intervention: req.body.intervention,
  });

  newIntervention
    .save()
    .then(() => {
      res.send('nouvelle intervention programmée');
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

//Récupérer toutes les interventions depuis la BDD
exports.getAllInterventions = (req, res) => {
  Intervention.find()
    .then((interventions) => {
      res.send(interventions);
    })
    .catch((err) => res.send(err));
};

//Récupérer les interventions, filtrées selon la demande du test technique
//récupère et classe les chirurgiens par leur nombre d'intervention (ordre décroissant)
exports.getFilteredInterventions = (req, res) => {
  Intervention.aggregate([
    {
      $group: {
        _id: {
          surgeon: '$surgeon',
        },

        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ])

    .then((chirurgiens) => {
      res.send(chirurgiens);
    })
    .catch((err) => {
      res.send(err);
    });
};
