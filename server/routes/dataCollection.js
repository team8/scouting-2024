const express = require('express'); 
const { addData } = require('../controllers/dataCollection-cont')

const router = express.Router(); 

//router.get('/get-data', getData);

router.post('/add-data/', addData);

module.exports = router;