/**
 * Main app for project-api
 * @author Jake Harmon 
 */

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


const companyRouter = require('./routes/companies'); 
app.use('/companies', companyRouter); //using the company route

const server = app.listen(port, () => {
  console.log(`app.js listening on port ${port}`);
});

module.exports = server;