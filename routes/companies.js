/**
 * Route for /companies URLs, handles different HTML functions
 * @author Jake Harmon
 */
const express = require('express');
const router = express.Router();
const data = require('../Data/fake-data'); //importing data from fake-data.js
const utility = require("/home/ubuntu/project-api/Utilities.js");

const { errorResponder, errorLogger, invalidPathHandler, } = require('/home/ubuntu/project-api/middleware.js')
const { LengthError, NaNError, NonExistingError, InvalidSelectError, InvalidCompanyError, InvalidIdError } = require('/home/ubuntu/project-api/errors');

router.get('', (req, res) => { //returns all companies in fakeData
    res.status(200).json(data.fakeData);
});
/**
 *  *GET Allows client to get the data of specific companies 
 */
router.get('/:id', idValidate, queryValidate, (req, res) => {

    const id = req.params.id; //assigning the id variable to value in the url
    const select = req.query.select; //variable containing value representing instance variable to be returned from object
    let tempComp = {}; //blank object to be filled with data and returned 

    const currCompany = data.fakeData.find(function (company) {//using array.find to find a id match 
        return (company.id === id);
    });

    tempComp = currCompany; //assigning currCompany to return object as it will be returned if none of the if statements are triggered

    //if statements checking if select has value(s)
    if (select != undefined && !(Array.isArray(select))) { //if there are values for selects continues into the body
        //if there arent multiple selects, continues into the body and returns whatever instance variable is requested 
        tempComp = {};
        utility.getCompanyDataStr(currCompany, select, tempComp);
    }//if select is an array/multiple variables are selected, iterates array concatenating requested instance variables
    else if (select != undefined && Array.isArray(select)) {
        tempComp = {};
        utility.getCompanyData(currCompany, select, tempComp);
    }

    if (res.headersSent !== true) { //making sure no other headers have been sent
        res.status(200).json(tempComp);
    }
});

/**
 *  *POST Allows the client to post a new company object into the fakeData array 
 */
router.post('/', (req, res) => {
    const currComp = req.body; //storing the body data in a new object 
    let isDuplicate = false;
    if (!(utility.isCompanyValid(currComp))) {
        res.status(400).send("Incorrect syntax for the body"); //makes sure all the values are initialized and valid 
    }
    else if (!(utility.isValidId(currComp.id))) { //checking for incorrect id length
        res.status(400).send("Incorrect ID length in the body");
    }
    else { //checking for a duplicate id 
        isDuplicate = utility.isIdDuplicate(currComp.id);
    }
    if (isDuplicate) {
        res.status(400).send("There is already a company with the ID: " + currComp.id);
    }
    else { //if no errors are present, adds new company object to fakeData
        data.fakeData.push(currComp); // adding new company to the fakeData array
        res.status(201).send("New Company object has been created with an id of: " + currComp.id);
    }
});

/** 
* * DELETE Allows the client to delete a company object that is in the fakeData array 
*/
router.delete('/:id', idValidate, (req, res) => {
    const id = req.params.id;
    const currCompany = data.fakeData.find(function (company) { //using array.find to find a id match 
        return (company.id === id);
    });
    if (currCompany == undefined) {
        throw new NonExistingError(id);
    }
    else {
        utility.removeFromArray(currCompany.id, data.fakeData);
        res.status(201).send("The company with the ID: " + id + " has been deleted");
    }
});

/** 
*  * PUT Allows the client to change instance variables of a company currently in the fakeData array
*/
router.put('/', (req, res) => {
    const currComp = req.body; // creating an instance of a company by what is defined in the body
    let exists = false; //if a company has the id found in the body, will be changed to true
    if (currComp == undefined) {
        res.status(404).send({ error: "THERE IS NO COMPANY WITH THIS ID" });
    }
    else if (!(utility.isCompanyValid(currComp))) {
        throw new InvalidCompanyError(); //makes sure all the values are initialized and valid 
    }
    exists = utility.isIdDuplicate(currComp.id); // checking if there is a duplicate 
    if (exists == false) { //if there is no id match an and error is sent
        throw new NonExistingError(currComp.id);
    }
    else if (exists) {
        utility.replaceCompany(currComp);
        res.status(200).send("Company object has been replaced");
    }
});


/**
 * Function used to test if an id is valid
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
function idValidate(req, res, next) {

    if (!(utility.isValidId(req.params.id))) {
        next(new InvalidIdError(req.params.id));
    }
    else {
        next();
    }

}
/**
 * Function that tests whether a query is valid
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
function queryValidate(req, res, next) {

    if (req.query.select === undefined) {
        next();
    }
    else {
        if (Array.isArray(req.query.select) && !(utility.isValidSelectArray(req.query.select))) {
            next(new InvalidSelectError(req.query.select));
            console.log("invalid array select test")
        }
        else if (typeof req.query.select !== Array && !(utility.isValidSelectStr(req.query.select))) {
            next(new InvalidSelectError(req.query.select));
            console.log('invalid str select test')
        }
        else {
            next();
        }
    }
}

router.use(errorLogger);
router.use(errorResponder);
//router.use(invalidPathHandler);
module.exports = router;