const express = require('express');
const router = express.Router();
const interventionRouter = require('./interventionRoute');

router.use('/intervention', interventionRouter);

module.exports = router;
