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
      owner = data.fakeData[i].owner;
      phoneNumber = data.fakeData[i].phoneNumber;
      location = data.fakeData[i].location;
      break;
    }
  }
  try { //catching invalid id errors
    if (id == undefined) {
      throw "ERROR: PLEASE ENTER A FOUR DIGIT ID VALUE"
    }
    else if (isNaN(id)) {  //is id a number
      throw "ERROR: INVALID ID, MUST BE A NUMBER";
    }
    else if (id.length > 4 || id.length < 4) { //is id too long or too short, must be four digits
      throw "ERROR: INVALID ID LENGTH, MUST BE FOUR DIGITS";
    }
    else if (id < 0) {//is ID less than zero 
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

  let id = req.params.id; //assigning the id variable to value in the url
  //let select = new Array();
  let select = req.query.select; //variable containing value representing instance variable to be returned from object
  let name = '';

  let currCompany = undefined;

  for (i = 0; i < data.fakeData.length; i++) {  //iterates over the fakeData array looking for id match
    if (id == data.fakeData[i].id) {
      currCompany = data.fakeData[i];
      break;
    }
  }
  try { //catching invalid id errors
    if (id == undefined) { throw "ERROR: PLEASE ENTER A FOUR DIGIT ID VALUE" }
    else if (isNaN(id)) { throw "ERROR: INVALID ID, MUST BE A NUMBER"; } //is id a number
    else if (id.length > 4 || id.length < 4) { throw "ERROR: INVALID ID LENGTH, MUST BE FOUR DIGITS"; } //is id too long or too short, must be four digits
    else if (id < 0) { throw "ERROR: ID LESS THAN ZERO"; } //is ID less than zero 
    else if (currCompany.name == '') { throw "ERROR: ID NOT TIED TO ANY EXISTING COMPANY"; } //is there a company tied to the ID
  }
  catch (err) {
    res.send(err); //printing error message to the screen
  }
  let str = "Company: " + currCompany.name + "<br />";
    if (select != undefined && !(Array.isArray(select))) { //checks wheter select has multiple entries, if not prints out desired instance variable
      try {
        if (select.localeCompare("email") == 0) {
          str += " Email: " + currCompany.email + "<br />";
        }
        else if (select.localeCompare("owner") == 0) {
          str += " Owner: " + currCompany.owner + "<br />";
        }
        else if (select.localeCompare("phoneNumber") == 0) {
          str += " Phone Number: " + currCompany.phoneNumber + "<br />";
        }
        else if (select.localeCompare("location") == 0) {
          str += " Location: " + currCompany.location + "<br />";
        }
        else if (select.localeCompare("all") == 0) {
          str += "Email: " + currCompany.email + "<br />Owner: " + currCompany.owner + "<br />Phone Number: " + currCompany.phoneNumber + "<br />Location: " + currCompany.location;
        }
        else { //throws an error if the select value is not supported
          throw "ERROR: INVALID SELECT VALUE \"" + select + "\"";
        }
      }
      catch (err) {
        res.send(err);
      }
    }
    else if (select != undefined && Array.isArray(select)) { //if select is an array, loops over array printing out requested instance variables
      try {
        for (let i = 0; i < select.length; i++) {
          if (select[i].localeCompare("email") == 0) {
            str += " Email: " + currCompany.email + "<br />";
          }
          else if (select[i].localeCompare("owner") == 0) {
            str += " Owner: " + currCompany.owner + "<br />";
          }
          else if (select[i].localeCompare("phoneNumber") == 0) {
            str += " Phone Number: " + currCompany.phoneNumber + "<br />";
          }
          else if (select[i].localeCompare("location") == 0) {
            str += " Location: " + currCompany.location + "<br />";
          }
          else if (select[i].localeCompare("all") == 0) {
            str += "Email: " + currCompany.email + "<br />Owner: " + currCompany.owner + "<br />Phone Number: " + currCompany.phoneNumber + "<br />Location: " + currCompany.location;
          }
          else { //throws an error if one of the select values is not supported 
            throw "ERROR: ONE OR MORE INVALID SELECT VALUE(s) \"" + select + "\"";
          }
        }
      }
      catch (err) {
        res.send(err);
      }
    }
  if (res.headersSent !== true) { //prevents multiple headers from being sent
    //printing company data onto the webpage
    res.send(str);
  }
})


app.listen(port, () => {
  console.log(`Company app listening on port ${port}`);
})

