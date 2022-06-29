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
const dotenv =  require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
  res.send('Hello World!');
});


const companyRouter = require('./routes/companies'); 
app.use('/companies', companyRouter); //using the company route

//  const port2 = process.env.PORT
//  console.log({port2})

const server = app.listen(port, () => {
  console.log(`app.js listening on port ${port}`);
});

module.exports = server;