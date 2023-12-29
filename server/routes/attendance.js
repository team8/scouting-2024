const express = require('express'); 
const { getHours, idEntered} = require('../controllers/attendance-cont')

const router = express.Router(); 


router.get('/enter-id/:id', idEntered)


router.get('/get-hours', getHours)

module.exports = router;