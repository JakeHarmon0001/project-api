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
query GET request
*/
app.get('/company', async function (req, res) { 

  let id = req.query.id; //assigning the id variable to value in the url
  let name = '';
  for (i = 0; i < data.fakeData.length; i++) { //iterates over the fakeData array looking for id match
    if (id == data.fakeData[i].id) {
      name = data.fakeData[i].name; // if there is a match sets name variable etc.
      email = data.fakeData[i].email;
      owner =  data.fakeData[i].owner;
      phoneNumber = data.fakeData[i].phoneNumber;
      location = data.fakeData[i].location;
      break;
    }
  }
  try { //catching invalid id errors
    if(id == undefined){
      throw "ERROR: PLEASE ENTER A FOUR DIGIT ID VALUE"
    }
    else if(isNaN(id)){  //is id a number
      throw "ERROR: INVALID ID, MUST BE A NUMBER";
    }
    else if(id.length > 4 || id.length < 4) { //is id too long or too short, must be four digits
      throw "ERROR: INVALID ID LENGTH, MUST BE FOUR DIGITS";
    }
    else if(id < 0) {//is ID less than zero 
      throw "ERROR: ID LESS THAN ZERO";
    }
    else if (name == '') { //is there a company tied to the ID
      throw "ERROR: ID NOT TIED TO ANY EXISTING COMPANY";
    }
  }
  catch (err) {
    res.send(err); //printing error message to the screen
  }
  if (res.headersSent !== true) { //prevents multiple headers from being sent
    let str = "Company: " + name + "<br />Email: " + email + "<br />Owner: " + owner + "<br />Phone Number: " + phoneNumber + "<br />Location: " + location;
    res.send(str);    
  }
})

/*
parameter GET request
*/
app.get('/company/:id', (req, res) => { 

  let id = req.params.id //assigning the id variable to value in the url
  let name = '';
  for (i = 0; i < data.fakeData.length; i++) {  //iterates over the fakeData array looking for id match
    if (id == data.fakeData[i].id) {
      name = data.fakeData[i].name; // if there is a match sets name variable etc.
      email = data.fakeData[i].email;
      owner =  data.fakeData[i].owner;
      phoneNumber = data.fakeData[i].phoneNumber;
      location = data.fakeData[i].location;
      break;
    }
  }
  try { //catching invalid id errors
    if(id == undefined){
      throw "ERROR: PLEASE ENTER A FOUR DIGIT ID VALUE"
    }
    else if(isNaN(id)){  //is id a number
      throw "ERROR: INVALID ID, MUST BE A NUMBER";
    }
    else if(id.length > 4 || id.length < 4) { //is id too long or too short, must be four digits
      throw "ERROR: INVALID ID LENGTH, MUST BE FOUR DIGITS";
    }
    else if(id < 0) {//is ID less than zero 
      throw "ERROR: ID LESS THAN ZERO";
    }
    else if (name == '') { //is there a company tied to the ID
      throw "ERROR: ID NOT TIED TO ANY EXISTING COMPANY";
    }
  }
  catch (err) {
    res.send(err); //printing error message to the screen
  }
  if (res.headersSent !== true) { //prevents multiple headers from being sent
    //printing company data onto the webpage
    let str = "Company: " + name + "<br />Email: " + email + "<br />Owner: " + owner + "<br />Phone Number: " + phoneNumber + "<br />Location: " + location;
    res.send(str);    
  }
})


app.listen(port, () => {
  console.log(`Company app listening on port ${port}`);
})

