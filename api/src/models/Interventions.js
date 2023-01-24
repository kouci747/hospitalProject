const mongoose = require('mongoose');

const InterventionsSchema = mongoose.Schema({
  surgeon: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  anesthsiste: {
    type: String,
    required: true,
  },
  nurse1: {
    type: String,
    required: true,
  },
  nurse2: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  intervention: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Interventions', InterventionsSchema);
