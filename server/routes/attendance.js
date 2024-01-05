const express = require('express'); 
const { getHours, idEntered, checkPassword} = require('../controllers/attendance-cont')

const router = express.Router(); 


router.get('/enter-id/:id', idEntered)

router.get('/get-hours', getHours)



router.get('/check-password/:attempt', checkPassword)

module.exports = router;