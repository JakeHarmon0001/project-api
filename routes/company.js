const express = require('express')
const router = express.Router()
const data = require('../Data/fake-data') //importing data from fake-data.js


router.get('/:id', (req, res) => {

    let id = req.params.id; //assigning the id variable to value in the url
    let select = req.query.select; //variable containing value representing instance variable to be returned from object

    const currCompany = data.fakeData.find(function (company) {//using array.find to find a id match 
        return (company.id === id);
    });

    let str = ""; //setting blank value for str
    let retObj = undefined; //object that will be res.JSON

    if (id == undefined) { res.status(401).send({error: "ENTER A FOUR DIGIT ID VALUE"}); }
        else if (isNaN(id)) { res.status(401).send({error: "INVALID ID, MUST BE A NUMBER"}); } //is id a number
        else if (id.length > 4 || id.length < 4) { res.status(401).send({error: "INVALID ID LENGTH, MUST BE FOUR DIGITS"}); } //is id too long or too short, must be four digits
        else if (id < 0) { res.status(401).send({error: "ID LESS THAN ZERO"}); } //is ID less than zero 
        else if (currCompany == undefined) { res.status(401).send({error: "ID NOT TIED TO ANY EXISTING COMPANY"}); } //is there a company tied to the ID
        retObj = currCompany;
    if (select != undefined) { //if there are values for selects continues into the body
        str = ""; //resetting str so you can filter instance variables
        if (select != undefined && !(Array.isArray(select))) { //if there are multiple selects, continues into the body
                if (select.localeCompare("email") == 0) {
                    retObj = currCompany.email;
                }
                else if (select.localeCompare("name") == 0) {
                    retObj = currCompany.name;
                }
                else if (select.localeCompare("id") == 0) {
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
                    res.status(401).send({error: "ERROR: INVALID SELECT VALUE \"" + select + "\""});
                }
            }
        }
        else if (select != undefined && Array.isArray(select)) { //if select is an array, loops over array printing out requested instance variables
                str += "{";
                for (let i = 0; i < select.length; i++) {
                    if (select[i].localeCompare("email") == 0) {
                        str += "\"email\":\"" + currCompany.email + "\"";
                    }
                    else if (select[i].localeCompare("name") == 0) {
                        str += "\"name\":\"" + currCompany.name + "\"";
                    }
                    else if (select[i].localeCompare("id") == 0) {
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
                        res.send({error: "ERROR: ONE OR MORE INVALID SELECT VALUE(s) \"" + select + "\""});
                    }
                    if (select.length - i > 1 && select[i].localeCompare("all") != 0) {
                        str += ",";
                    }
                    if (select.length - i == 1 && select[i].localeCompare("all") != 0) {
                        str += "}";
                    }
                }
            
            // catch (err) {
            //     if (res.headersSent !== true) { //prevents multiple headers from being sent
            //         res.send(err); //sending error
            //     }
            // }
        }
    
    if (res.headersSent !== true && !(select != undefined && Array.isArray(select))) { //prevents multiple headers from being sent
        res.json(retObj);//printing company data onto the webpage in JSON FORMAT
    }
    else if (res.headersSent !== true && select != undefined && Array.isArray(select)) {//if there are multiple queries goes into this body
        res.json(str);
    }
})

/**
 **Allows the client to post a new company object into the fakeData array 
 */
router.post('/', (req, res) => {
    const comp = req.body; //storing the body data in a new object 
    console.log(req.body);
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
        res.status(201).send("Object Created");
    }
});

/** 
** Allows the client to delete a company object that is in the fakeData array 
*/
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    const currCompany = data.fakeData.find(function (company) {//using array.find to find a id match 
        return (company.id === id);
    });
    if (currCompany == undefined) {
        res.status(400).send("ERROR: THERE IS NO COMPANY WITH THIS ID");
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
** Allows the client to change instance variables of a company currently in the fakeData array
*/
router.put('/', (req, res) => {
    const currComp = req.body; // creating an instance of a company by what is defined in the body
    let exists = false; //if a company has the id found in the body, will be changed to true
    if (currComp == undefined) {
        res.status(400).send("ERROR: THERE IS NO COMPANY WITH THIS ID");
    }
    else if (currComp.name == undefined || currComp.id == undefined || currComp.email == undefined || currComp.owner == undefined || currComp.phoneNumber == undefined || currComp.location == undefined) {
        res.status(400).send("Incorrect syntax for the body"); //makes sure all the values are initialized and valid 
    }
    for (let i = 0; i < data.fakeData.length; i++) { //iterating through the data list to find a id match 
        if (currComp.id == data.fakeData[i].id) {
            exists = true;
            data.fakeData[i] = currComp; //assigning new values to the old company object
            res.status(201).send("Replaced old " + currComp.id + " with new value(s)");
            break;
        }
    }
    if (exists == false) { //if there is no id match an and error is sent
        res.status(201).send("NO COMPANY WITH THAT ID ");
    }
});

module.exports = router;