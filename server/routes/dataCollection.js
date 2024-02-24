const express = require('express'); 
const { addData } = require('../controllers/dataCollection-cont')

const router = express.Router(); 

//router.get('/get-data', getData);

router.get('/add-data/:data', addData);

//router.get('/change-data', changeData);

module.exports = router;