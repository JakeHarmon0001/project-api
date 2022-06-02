const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const data = require('./fake-data'); //importing data from fake-data.js

app.get('/', (req, res) => {
  res.send('Hello World!');
})

/*
query get request
*/
app.get('/company', async function (req, res) { 

  let id = req.query.id;
  let name = '';
  for (i = 0; i < data.fakeData.length; i++) { //iterates over the fakeData array looking for id match
    if (id == data.fakeData[i].id) {
      name = data.fakeData[i].name; // if there is a match sets name variable
      break;
    }
  }
  try { //catching invalid id errors
    if (name == '' || id.length > 4) {
      throw "INVALID ID";
    }
  }
  catch (err) {
    res.send(err); //printing error message to the screen
  }
  if (res.headersSent !== true) { //prevents multiple headers from being sent
    res.send("Company: " + name);
  }
})

/*
parameter get request
*/
app.get('/company/:id', (req, res) => { 

  let id = req.params.id
  let name = '';
  for (i = 0; i < data.fakeData.length; i++) {  //iterates over the fakeData array looking for id match
    if (id == data.fakeData[i].id) {
      name = data.fakeData[i].name; // if there is a match sets name variable
      break;
    }
  }
  try { //catching invalid id errors
    if (name == '' || id.length > 4) {
      throw "INVALID ID";
    }
  }
  catch (err) {
    res.send(err); //printing error message to the screen
  }
  if (res.headersSent !== true) { //prevents multiple headers from being sent
    res.send("Company: " + name);
  }
})


app.listen(port, () => {
  console.log(`Company app listening on port ${port}`);
})

