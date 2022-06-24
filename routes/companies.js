/**
 * Route for /companies URLs, handles different HTML functions
 * @author Jake Harmon
 */
const express = require('express');

const router = express.Router();
const dotenv =  require("dotenv").config();


const data = require('../Data/fake-data'); //importing data from fake-data.js
//const utility = require("/home/ubuntu/project-api/Utilities.js"); //importing functions from Utilities.js
const utility = require(".../Utilities.js"); //importing functions from Utilities.js

const schema = require("../schema")


const mongoose = require("mongoose");
// Connecting to database
mongoose.connect(
  "mongodb+srv://jakeharmon11:073307ZoeyChar@apicluster0.0lokkaj.mongodb.net/local_library?retryWrites=true&w=majority",
  {
    dbName: "apicluster0",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err) : console.log(
      "Connected to yourDB-name database")
);
const db = mongoose.connection;

router.get('test', (req, res) => { //returns all companies in fakeData
    try {
        const res = await companySchema.create(record)
    } catch(error) {
        console.error(error)
        // handle the error
    }
});

// const { errorResponder, errorLogger, invalidPathHandler, } = require('/home/ubuntu/project-api/middleware.js')
const { errorResponder, errorLogger, invalidPathHandler, } = require('.../middleware.js')

// const { LengthError, NaNError, NonExistingError, InvalidSelectError, InvalidCompanyError, InvalidIdError, DuplicateError, DoesntExistError } = require('/home/ubuntu/project-api/errors');
const { LengthError, NaNError, NonExistingError, InvalidSelectError, InvalidCompanyError, InvalidIdError, DuplicateError, DoesntExistError } = require('.../errors');

router.get('', (req, res) => { //returns all companies in fakeData
    res.status(200).json(data.fakeData); 
    //res.status(200).json(db.collection("companies").toString()); //testing database access
});
/**
 *+GET Allows client to get the data of specific companies 
 */
router.get('/:id', idValidate, queryValidate, companyExistsValidate,  (req, res) => {

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
 *+POST Allows the client to post a new company object into the fakeData array 
 */
router.post('/', companyVarsValidate, companyDoesntExistsBody, (req, res) => {
    const currComp = req.body; //storing the body data in a new object 
    data.fakeData.push(currComp); // adding new company to the fakeData array
    res.status(201).send("New Company object has been created with an id of: " + currComp.id);
});

/** 
*+DELETE Allows the client to delete a company object that is in the fakeData array 
*/
router.delete('/:id', idValidate, companyExistsValidate, (req, res) => {
    const id = req.params.id;
    const currCompany = data.fakeData.find(function (company) { //using array.find to find a id match 
        return (company.id === id);
    });
    utility.removeFromArray(currCompany.id, data.fakeData); //removing desired company from array
    res.status(200).send("The company with the ID: " + id + " has been deleted");
});

/** 
*+PUT Allows the client to change instance variables of a company currently in the fakeData array
*/
router.put('/', companyExistsValidateBody, companyVarsValidate, (req, res) => {
    const currComp = req.body; // creating an instance of a company by what is defined in the body
    utility.replaceCompany(currComp); //replacing company
    res.status(200).send("Company object has been replaced");
});


/**
 *-Function used to test if an id is valid
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
function idValidate(req, res, next) {
    if (!(utility.isValidId(req.params.id))) { //makes sure the id is valid 
        next(new InvalidIdError(req.params.id));
    }
    else { //else moves on
        next();
    }
}
/**
 *-Function that tests whether a query is valid
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
function queryValidate(req, res, next) {
    if (req.query.select === undefined) { //if there is no query, moves on 
        next();
    }
    else {
        if (Array.isArray(req.query.select) && !(utility.isValidSelectArray(req.query.select))) { // case for multiple selects
            next(new InvalidSelectError(req.query.select));
            console.log("invalid array select test")
        }
        else if (typeof req.query.select !== Array && !(utility.isValidSelectStr(req.query.select))) { //case for one select
            next(new InvalidSelectError(req.query.select));
            console.log('invalid 0str select test')
        }
        else { //else, moves on 
            next();
        }
    }
}

/**
 *-Validates company data by checking the body of the request
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
function companyVarsValidate(req, res, next) {
    let tempObj = req.body; // putting the req body into an object for validation
    if ((utility.isCompanyValid(tempObj))) { // if company is valid checks for a duplicate id
            next(); //moves on 
    }
    else { //else, throws an error
        next(new InvalidCompanyError);
    }
}
/**
 *!NEED TO LOOK AT, IS CAUSING PROBLEMS
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * -Careful using this in get because the id is not passed in the request body and will cause problems 
 */
function companyExistsValidate(req, res, next) {
    const id = req.params.id; 

    const currCompany = data.fakeData.find(function (company) { //using array.find to find a id match 
        return (company.id === id);
    });
    if (currCompany === undefined) {
        next(new DoesntExistError(id));
    }
    else {
        next();
    }
}

function companyExistsValidateBody(req, res, next) {
    const id = req.body.id; 

    const currCompany = data.fakeData.find(function (company) { //using array.find to find a id match 
        return (company.id === id);
    });
    if (currCompany === undefined) {
        next(new DoesntExistError(id));
    }
    else {
        next();
    }
}

function companyDoesntExistsBody(req, res, next) {
    const id = req.body.id; 

    const currCompany = data.fakeData.find(function (company) { //using array.find to find a id match 
        return (company.id === id);
    });
    if (currCompany !== undefined) {
        next(new DoesntExistError(id));
    }
    else {
        next();
    }
}
router.use(errorLogger); //logs errors
router.use(errorResponder); //responds to errors
module.exports = router;