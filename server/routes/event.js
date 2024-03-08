const express = require('express');

const {getTeams, initializeEvent} = require('../controllers/event-cont')

const router = express.Router();

router.get('/get-teams/:event', getTeams)
router.get("/initialize-event/:key", initializeEvent)

module.exports = router