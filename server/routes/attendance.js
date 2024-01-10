const express = require('express'); 
const { getTableData, idEntered, checkPassword, getSubteamHours, getStudentData, addHours, correctStudentData, getHours} = require('../controllers/attendance-cont')

const router = express.Router(); 


router.get('/enter-id/:id', idEntered)

router.get('/get-table-data', getTableData)

router.get('/get-subteam-data', getSubteamHours)

router.get('/check-password/:attempt', checkPassword)

router.get('/get-student-data/:id', getStudentData)

router.post('/add-hours', addHours)

router.get('/correct-student-data', correctStudentData)

router.post('/get-hours', getHours)

module.exports = router;