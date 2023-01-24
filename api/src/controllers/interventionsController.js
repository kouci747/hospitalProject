const Intervention = require('../models/Interventions.js');

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

exports.getAllInterventions = (req, res) => {
  Intervention.find()
    .then((interventions) => {
      res.send(interventions);
    })
    .catch((err) => res.send(err));
};
/*
exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => res.send(err));
};
*/
