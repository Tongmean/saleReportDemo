const express = require('express');
// app express
const app = express();
//Call cors
const cors = require('cors')
//Call body-parser
const bodyParser = require('body-parser');
//import router
const matidRouter = require('./route/matidRoute');
const saleOrderRouter = require('./route/saleOrderRoute');
const setEndRouter = require('./route/setEndRoute')
const creditNoteRouter = require('./route/creditNoteRoute')
const verifyRouter = require('./route/verifyRoute')
const dateConfirmRouter = require('./route/dateConfirmRoute')
const lastestConfirmDateRouter = require('./route/latestConfirmDateRoute')
//import check connection
const checkDBConnection = require('./middleware/checkDBConnnection')
//Middleware
app.use(cors())
app.use(express.json()); // Upcoming req to Json
app.use(bodyParser.json());
//verify do not use database
app.use('/api/verifypin', verifyRouter);
//check connection database
app.use(checkDBConnection);

app.use('/api/matid', matidRouter);

app.use('/api/saleorder', saleOrderRouter);

app.use('/api/setend', setEndRouter);

app.use('/api/creditnote', creditNoteRouter);


app.use('/api/dateconfirm', dateConfirmRouter);

app.use('/api/lastDateSaleOrder', lastestConfirmDateRouter);


require('dotenv').config();
const port = process.env.PORT || 8000;
//listen port
app.listen(port, (req, res) => {

    console.log('Your server run on port', port)
})