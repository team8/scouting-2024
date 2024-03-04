const express = require('express');

const {getTeams} = require('../controllers/event-cont')

const router = express.Router();

router.get('/get-teams/:event', getTeams)

module.exports = router