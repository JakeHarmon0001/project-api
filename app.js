const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
const data = require('./Data/fake-data'); //importing data from fake-data.js

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/companies', (req, res) => { //returns all companies in fakeData
  res.status(200).json(data.fakeData);
});

const companyRouter = require('./routes/company'); 
app.use('/company', companyRouter); //using the company route

app.listen(port, () => {
  console.log(`app.js listening on port ${port}`);
});

