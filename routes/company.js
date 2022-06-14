/**
 * Route for /company URLs, handles different HTML functions
 * @author Jake Harmon
 */
const express = require('express');
const router = express.Router();
const data = require('../Data/fake-data'); //importing data from fake-data.js

/**
 * *GET Allows client to get the data of specific companies 
 */
router.get('/:id', (req, res) => {

    let id = req.params.id; //assigning the id variable to value in the url
    let select = req.query.select; //variable containing value representing instance variable to be returned from object
    let tempObj = {}; //blank object to be filled with data and returned 

    const currCompany = data.fakeData.find(function (company) {//using array.find to find a id match 
        return (company.id === id);
    });
    //checking for initial errors
    if (id == undefined) { //no id is entered 
        res.status(400).send({ error: "ENTER A FOUR DIGIT ID VALUE" });
    }
    else if (isNaN(id)) { //is id is not a number
        res.status(400).send({ error: "INVALID ID, MUST BE A NUMBER" });
    }
    else if (id.length > 4 || id.length < 4) {//is id too long or too short, must be four digits
        res.status(400).send({ error: "INVALID ID LENGTH, MUST BE FOUR DIGITS" });
    }
    else if (id < 0) { //is ID less than zero 
        res.status(400).send({ error: "ID LESS THAN ZERO" });
    }
    else if (currCompany == undefined) { //no company tied to the ID
        res.status(404).send({ error: "ID NOT TIED TO ANY EXISTING COMPANY" });
    }

    tempObj = currCompany; //assigning currCompany to return object as it will be returned if none of the if statements are triggered
    //if statements checking if select has value(s)
    if (select != undefined && !(Array.isArray(select))) { //if there are values for selects continues into the body
        //if there are multiple selects, continues into the body and returns whatever instance variable is requested 
        tempObj = {};
        if (select.localeCompare("email") == 0) {
            tempObj.email = currCompany.email;
        }
        else if (select.localeCompare("name") == 0) {
            tempObj.name = currCompany.name;
        }
        else if (select.localeCompare("id") == 0) {
            tempObj.id = currCompany.id;
        }
        else if (select.localeCompare("owner") == 0) {
            tempObj.owner = currCompany.owner;
        }
        else if (select.localeCompare("phoneNumber") == 0) {
            tempObj.phoneNumber = currCompany.phoneNumber;
        }
        else if (select.localeCompare("location") == 0) {
            tempObj.location = currCompany.location;
        }
        else if (select.localeCompare("all") == 0) {
            tempObj = currCompany;
        }
        else { //throws an error if the select value is not supported
            res.status(400).send({ error: "ERROR: INVALID SELECT VALUE \"" + select + "\"" });
        }
    }
    else if (select != undefined && Array.isArray(select)) { //if select is an array/multiple variables are selected, iterates array concatenating requested instance variables
        tempObj = {};
        for (let i = 0; i < select.length; i++) { //iterates through array and adds new fields to tempObj
            if (select[i].localeCompare("email") == 0) {
                tempObj.email = currCompany.email;
            }
            else if (select[i].localeCompare("name") == 0) {
                tempObj.name = currCompany.name;
            }
            else if (select[i].localeCompare("id") == 0) {
                tempObj.id = currCompany.id;
            }
            else if (select[i].localeCompare("owner") == 0) {
                tempObj.owner = currCompany.owner;
            }
            else if (select[i].localeCompare("phoneNumber") == 0) {
                tempObj.phoneNumber = currCompany.phoneNumber;
            }
            else if (select[i].localeCompare("location") == 0) {
                tempObj.location = currCompany.location;
            }
            else if (select[i].localeCompare("all") == 0) {
                tempObj = currCompany;
                break; //no point in continuing to iterate over array
            }
            else { //throws an error if one of the select values is not supported 
                res.status(400).send({ error: "ERROR: ONE OR MORE INVALID SELECT VALUE(s) \"" + select + "\"" });
            }
        }
    }

    if (res.headersSent !== true) { //making sure no other headers have been sent
        res.status(200).json(tempObj);
    }
});

/**
 **POST Allows the client to post a new company object into the fakeData array 
 */
router.post('/', (req, res) => {
    const comp = req.body; //storing the body data in a new object 
    let isDuplicate = false;
    if (comp.name == undefined || comp.id == undefined || comp.email == undefined || comp.owner == undefined || comp.phoneNumber == undefined || comp.location == undefined) {
        res.status(400).send("Incorrect syntax for the body"); //makes sure all the values are initialized and valid 
    }
    else if (comp.id.length > 4 || comp.id < 4) { //checking for incorrect id length
        res.status(400).send("Incorrect ID length in the body");
    }
    else { //checking for a duplicate id 
        for (let i = 0; i < data.fakeData.length; i++) {
            if (comp.id == data.fakeData[i].id) {
                isDuplicate = true;
                break;
            }
        }
    }
    if (isDuplicate) {
        res.status(400).send("There is already a company with the ID: " + comp.id);
    }
    else { //if no errors are present, adds new company object to fakeData
        data.fakeData.push(comp); // adding new company to the fakeData array
        res.status(201).send("New Company object has been created with an id of: " + comp.id);
    }
});

/** 
** DELETE Allows the client to delete a company object that is in the fakeData array 
*/
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    const currCompany = data.fakeData.find(function (company) { //using array.find to find a id match 
        return (company.id === id);
    });
    if (currCompany == undefined) {
        res.status(404).send("ERROR: THERE IS NO COMPANY WITH THIS ID");
    }
    else {
        for (let i = 0; i < data.fakeData.length; i++) {
            if (currCompany.id == data.fakeData[i].id) {
                data.fakeData.splice(i, 1);
                break;
            }
        }
        res.status(201).send("The company with the ID: " + id + " has been deleted");
    }
});

/** 
** PUT Allows the client to change instance variables of a company currently in the fakeData array
*/
router.put('/', (req, res) => {
    const currComp = req.body; // creating an instance of a company by what is defined in the body
    let exists = false; //if a company has the id found in the body, will be changed to true
    if (currComp == undefined) {
        res.status(404).send({ error: "THERE IS NO COMPANY WITH THIS ID" });
    }
    else if (currComp.name == undefined || currComp.id == undefined || currComp.email == undefined || currComp.owner == undefined || currComp.phoneNumber == undefined || currComp.location == undefined) {
        res.status(400).send("Incorrect syntax for the body"); //makes sure all the values are initialized and valid 
    }
    for (let i = 0; i < data.fakeData.length; i++) { //iterating through the data list to find a id match 
        if (currComp.id == data.fakeData[i].id) {
            exists = true;
            data.fakeData[i] = currComp; //assigning new values to the old company object
            res.status(200).send("Replaced old " + currComp.id + " with new value(s)");
            break;
        }
    }
    if (exists == false) { //if there is no id match an and error is sent
        res.status(404).send({ error: "NO COMPANY WITH THAT ID" });
    }
});

module.exports = router;