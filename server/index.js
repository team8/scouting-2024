const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

const attendance = require('./routes/attendance')
const event = require('./routes/event')

const port = 4000

app.set('views', './views')
app.set('view engine', 'ejs');

app.use(bodyParser.json()); // extracts the body portion of an incoming request and exposes it on req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors()); // cross-origin resource sharing allows for access of restricted resources on webpages from other domains
app.use(express.static(__dirname + '/views'));



app.get('/', (req, res) => {
  res.send('Successful Response')
})

app.use('/attendance', attendance)
app.use('/event', event)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})