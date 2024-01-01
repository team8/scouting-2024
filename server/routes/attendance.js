const express = require('express'); 
const { getHours, idEntered, setUserInfo} = require('../controllers/attendance-cont')

const router = express.Router(); 


router.get('/enter-id/:id', idEntered)


router.get('/get-hours', getHours)

router.post('/set-user-info', setUserInfo)

module.exports = router;