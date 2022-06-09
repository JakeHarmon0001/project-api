const express = require('express')
const router = express.Router()
const data = require('../Data/fake-data') //importing data from fake-data.js


router.get('/:id', (req, res) => {

    let id = req.params.id; //assigning the id variable to value in the url
    let select = req.query.select; //variable containing value representing instance variable to be returned from object
  
    const currCompany = data.fakeData.find(function(company) {//using array.find to find a id match 
      return (company.id === id);
    });
  
    //let str = ""; //setting blank value for str
    let retObj = undefined; //object that will be res.JSON
    try { //catching invalid id errors
      if (id == undefined) { throw "ERROR: PLEASE ENTER A FOUR DIGIT ID VALUE" }
      else if (isNaN(id)) { throw "ERROR: INVALID ID, MUST BE A NUMBER"; } //is id a number
      else if (id.length > 4 || id.length < 4) { throw "ERROR: INVALID ID LENGTH, MUST BE FOUR DIGITS"; } //is id too long or too short, must be four digits
      else if (id < 0) { throw "ERROR: ID LESS THAN ZERO"; } //is ID less than zero 
      else if (currCompany == undefined) { throw "ERROR: ID NOT TIED TO ANY EXISTING COMPANY"; } //is there a company tied to the ID
      //str = JSON.stringify(currCompany);
       retObj = currCompany;
    }
    catch (err) {
      res.status(400);//bad request error status 
      res.send(err); //printing error message to the screen
    }
    if (select != undefined) { //if there are values for selects continues into the body
      str = ""; //resetting str so you can filter instance variables
      if (select != undefined && !(Array.isArray(select))) { //if there are multiple selects, continues into the body
        try {
          if (select.localeCompare("email") == 0) {
            retObj = currCompany.email;
          }
           else if(select.localeCompare("name") == 0) {
             retObj = currCompany.name;
          }
          else if(select.localeCompare("id") == 0) {
            retObj = currCompany.id;
         }
          else if (select.localeCompare("owner") == 0) {
            retObj = currCompany.owner;
          }
          else if (select.localeCompare("phoneNumber") == 0) {
            retObj = currCompany.phoneNumber;
          }
          else if (select.localeCompare("location") == 0) {
            retObj = currCompany.location;
          }
          else if (select.localeCompare("all") == 0) {
            retObj = currCompany;
          }
          else { //throws an error if the select value is not supported
            throw "ERROR: INVALID SELECT VALUE \"" + select + "\"";
          }
        }
        catch (err) {
          if (res.headersSent !== true) { //prevents multiple headers from being sent
            res.status(400);//bad request error status
            res.send(err); //sending error
          }
        }
      }
      else if (select != undefined && Array.isArray(select)) { //if select is an array, loops over array printing out requested instance variables
        try {
          str += "{";
          for (let i = 0; i < select.length; i++) {
            if (select[i].localeCompare("email") == 0) {
              str += "\"email\":\"" + currCompany.email + "\"";
            }
             else if(select[i].localeCompare("name") == 0) {
               str += "\"name\":\"" + currCompany.name + "\"";
            }
            else if(select[i].localeCompare("id") == 0) {
              str += "\"id\":\"" + currCompany.id + "\"";
           }
            else if (select[i].localeCompare("owner") == 0) {
              str += "\"owner\":\"" + currCompany.owner + "\"";
            }
            else if (select[i].localeCompare("phoneNumber") == 0) {
              str += "\"phoneNumber\":\"" + currCompany.phoneNumber + "\"";
            }
            else if (select[i].localeCompare("location") == 0) {
              str += "\"location\":\"" + currCompany.location + "\"";
            }
            else if (select[i].localeCompare("all") == 0) {
              str = JSON.stringify(currCompany);
            }
            else { //throws an error if one of the select values is not supported 
              throw "ERROR: ONE OR MORE INVALID SELECT VALUE(s) \"" + select + "\"";
            }
            if(select.length - i > 1 && select[i].localeCompare("all") != 0) {
            str += ",";
            }
            if(select.length -i == 1 && select[i].localeCompare("all") != 0) {
              str += "}";
            }
          }
        }
        catch (err) {
          if (res.headersSent !== true) { //prevents multiple headers from being sent
            res.send(err); //sending error
          }
         }
       }
    }
    if (res.headersSent !== true && !(select != undefined && Array.isArray(select))) { //prevents multiple headers from being sent
      res.json(retObj);//printing company data onto the webpage in JSON FORMAT
    }
    else if(res.headersSent !== true && select != undefined && Array.isArray(select)) {//if there are multiple queries goes into this body
      res.json(str);
    }
  })

router.post('/', (req, res) => {
    const comp = req.body; //storing the body data in a new object 
    console.log(req.body);
    if(comp.name == undefined || comp.id == undefined || comp.email == undefined || comp.owner == undefined || comp.phoneNumber == undefined || comp.location == undefined) {
        res.status(400).send("Incorrect syntax for the body"); //makes sure all the values are initialized and valid 
    }
    else if(comp.id.length > 4 || comp.id < 4) {
        res.status(400).send("Incorrect ID length in the body");
    }
    else {
    data.fakeData.push(comp);
    res.status(201).send("Object Created");
    }

})  

router.delete('/:id',(req,res) => {


})

  module.exports = router;