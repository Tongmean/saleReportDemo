const express = require('express');
// app express
const app = express();
//Call cors
const cors = require('cors')
//Call body-parser
const bodyParser = require('body-parser');

const dbconnect = require('./dbconnect')
const matidRouter = require('./route/matidRoute')
//Middleware
app.use(cors())
app.use(express.json()); // Upcoming req to Json
app.use(bodyParser.json());

app.use('api/matid', matidRouter)


require('dotenv').config();
const port = process.env.PORT || 8000;
//listen port
app.listen(port, (req, res) => {

    console.log('Your server run on port', port)
})