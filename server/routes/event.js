const express = require('express');

const {getTeams, initializeEvent, getPicklist, setPicklist} = require('../controllers/event-cont')

const router = express.Router();

router.get('/get-teams/:event', getTeams);

router.get("/initialize-event/:key", initializeEvent);

router.get("/get-picklist/:event", getPicklist);

router.post("/set-picklist/:event", setPicklist);

module.exports = router;