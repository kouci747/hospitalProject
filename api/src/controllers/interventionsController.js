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
exports.getSurgeonsByNumberOfInterventions = (req, res) => {
  Intervention.aggregate([
    {
      $group: {
        _id: {
          surgeon: '$surgeon',
          specialty: '$specialty',
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

const surAneGrpOcc = async () =>
  Intervention.aggregate([
    {
      $group: {
        _id: {
          surgeon: '$surgeon',

          anesthsiste: '$anesthsiste',
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);

//la salle dans laquelle un chirurgien a le plus opéré :
exports.getMostUsedOperatingRoom = async (req, res) =>
  Intervention.aggregate([
    {
      $group: {
        _id: {
          surgeon: '$surgeon',

          roomNumber: '$roomNumber',
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ])
    .then((favOpRoom) => {
      res.send(favOpRoom);
    })
    .catch((err) => {
      res.send(err);
    });

// exports.getGroupsOfSurgeonsAndAnesthesist = async (req, res) => {
//   const getData = await surAneGrpOcc();
//   const getData1 = await surAneGrpOcc1();
//   const getData2 = await surAneGrpOcc2();

//   res.send({data1: getData, data2: });
// };

//Renvoie les occurences chirurgien-anesthesiste + la salle la plus frequentée par le chirurgien
exports.getGroupsOfSurgeonsAndAnesthesist = async (req, res) => {
  const getData = await surAneGrpOcc();
  const getData2 = await salleOperationFav();

  res.send({ data1: getData, data2: getData2 });
};

//expolorer cette piste
// db.collection.aggregate(
//   { $facet: {
//       categories: [{ $group: { _id: "$category", count: { "$sum": 1 } } }],
//       brands:     [{ $group: { _id: "$brand",    count: { "$sum": 1 } } }]
//   }}

//explorer cette piste
// exports.getFinalResult = async (req, res) => {
//   Intervention.aggregate({
//     $facet: {
//       surgeon: [
//         { $group: { _id: [surgeon, anesthsiste, nurse1], count: { $sum: 1 } } },
//       ],
//     },
//   });
// };

exports.getAnest = (req, res) => {
  //const spe = Intervention.find().projection('specialty');
  Intervention.aggregate([
    {
      $group: {
        _id: {
          surgeon: '$surgeon',
          anesthsiste: '$anesthsiste',
        },

        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ])
    .then((nurse) => {
      res.send(nurse);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getMostFreqIntervention = (req, res) => {
  Intervention.aggregate([
    {
      $group: {
        _id: {
          surgeon: '$surgeon',
          intervention: '$intervention',
        },

        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ])
    .then((inter) => {
      res.send(inter);
    })
    .catch((err) => {
      res.send(err);
    });
};

//tester

exports.getMostCommonNurse1 = async (req, res) => {
  await Intervention.aggregate([
    {
      $group: {
        _id: {
          surgeon: '$surgeon',
          nurse1: '$nurse1',
        },

        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ])
    .then((nurse1) => {
      res.send(nurse1);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getMostCommonNurse1 = async (req, res) => {
  await Intervention.aggregate([
    {
      $group: {
        _id: {
          surgeon: '$surgeon',
          nurse1: '$nurse1',
        },

        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ])
    .then((nurse1) => {
      res.send(nurse1);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getMostCommonNurse2 = async (req, res) => {
  await Intervention.aggregate([
    {
      $group: {
        _id: {
          surgeon: '$surgeon',
          nurse1: '$nurse2',
        },

        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ])
    .then((nurse2) => {
      res.send(nurse2);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.resultatTri = (req, res) => {
  Intervention.aggregate(
    [
      {
        $group: {
          _id: { surgeon: '$surgeon', specialty: '$specialty' },
          numberOfInterventions: { $sum: 1 },
          mostCommonAnesthsiste: { $max: '$anesthsiste' },
          mostCommonNurse: {
            $max: {
              $cond: {
                if: { $gt: ['$nurse1', '$nurse2'] },
                then: '$nurse1',
                else: '$nurse2',
              },
            },
          },
          mostCommonRoomNumber: { $max: '$roomNumber' },
          mostCommonIntervention: { $max: '$intervention' },
        },
      },
      {
        $sort: { numberOfInterventions: -1 },
      },
    ],
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};

exports.findAllSurgeonInterventionsByName = async (req, res) => {
  const surgeonName = req.body.surgeonName;
  Intervention.find({ surgeon: surgeonName })
    .then((interventions) => {
      res.send(interventions);
    })
    .catch((err) => res.send(err));
};
