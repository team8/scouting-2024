const express = require('express');

const { get_team, get_match } = require('../controllers/team-cont.js')

const router = express.Router();

// get event data for a team
router.get(`/:event/:team`, get_team);

// get match data for a team
router.get(`/:event/:team/:match`, get_match);



module.exports = router;