const express = require('express'); 
const { getHours, idEntered, setUserInfo, checkPassword} = require('../controllers/attendance-cont')

const router = express.Router(); 


router.get('/enter-id/:id', idEntered)

router.get('/get-hours', getHours)

router.post('/set-user-info', setUserInfo)

router.get('/check-password/:attempt', checkPassword)

module.exports = router;