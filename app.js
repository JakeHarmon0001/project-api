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
const data = require('./Data/fake-data'); //importing data from fake-data.js
//const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://jakeharmon11:073307ZoeyChar@apicluster0.0lokkaj.mongodb.net/local_library?retryWrites=true&w=majority",
//   {
//     dbName: "apicluster0",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) =>
//     err ? console.log(err) : console.log(
//       "Connected to yourDB-name database")
// );
// const db = mongoose.connection;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const companyRouter = require('./routes/companies'); 
app.use('/companies', companyRouter); //using the company route

const server = app.listen(port, () => {
  console.log(`app.js listening on port ${port}`);
});

module.exports = server;