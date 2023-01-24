const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const apiRouter = require('./routes');
require('dotenv').config();

app.use(bodyParser.json());

mongoose.set('strictQuery', false);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/hospital?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Base de données médicale connectée');
  })
  .catch((err) => console.log(err));

app.use('/api/v1', apiRouter);

app.listen(process.env.PORT, function () {
  console.log("Le serveur de l'hopital est en route");
});
