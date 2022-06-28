/**
* This file contains utility code to be used on different routes for the sake of code readability
* @author Jake Harmon
*/

const data = require('./Data/fake-data');
const express = require('express');
const Company = require("./models/company")

/**
 * Tests whether the given id is valid
 * ! need to find a way to detect if it is a Number or String, instanceof and typeof both arent working
 * @param {*} id 
 * @returns true if id is valid 
 */
function isValidId(id) {
    let isValid = true;
    if (id == undefined) {
        return false;
    }
    // else if (typeof id === String) {
    //     return false;
    // }
    else if (id.length < 4 || id.length > 4) {
        return false;
    }
    else if (id < 0) {
        return false;
    }
    return isValid;
}
/**
 * Checks fakeData for a duplicate id 
 * @param {*} id 
 * @returns true if there if the id exists already 
 */
function isIdDuplicate(id) {
    let isDuplicate = false;
    for (let i = 0; i < data.fakeData.length; i++) {
        if (id == data.fakeData[i].id) {
            return true;
        }
    }
    return isDuplicate;
}

/**
 * Removes company associated with id from the given array
 * @param {*} id 
 * @param {*} array
 */
function removeFromArray(id, array) {
    for (let i = 0; i < array.length; i++) {
        if (id == array[i].id) {
            array.splice(i, 1);
            break;
        }
    }
}

/**
 * replaces company associated with company.id with company 
 * @param {} company 
 */
function replaceCompany(company) {
    for (let i = 0; i < data.fakeData.length; i++) { //iterating through the data list to find a id match 
        if (company.id == data.fakeData[i].id) {
            data.fakeData[i] = company; //assigning new values to the old company object
            break;
        }
    }
}
/**
 * Checks to see if the fields of company are filled 
 * @param {} company 
 * @returns true if the company is valid/has all of its instance variables filled/not undefined
 */
function isCompanyValid(company) {
    if (company.name == undefined || company.compId == undefined || company.email == undefined || company.owner == undefined || company.phoneNumber == undefined || company.location == undefined) {
        return false;
    }
    return true;
}
/**
 * returns the desired company data listed in array from company in a new object
 * @param {*} company 
 * @param {*} array 
 */
function getCompanyData(company, array, jsonObj) {
    //compares array elements to valid select values and assings jsonObj.select the correct values from company
    for (let i = 0; i < array.length; i++) {
        if (array[i].localeCompare("id") == 0) {
            jsonObj.id = company.id;
        }
        else if (array[i].localeCompare("name") == 0) {
            jsonObj.name = company.name;
        }
        else if (array[i].localeCompare("email") == 0) {
            jsonObj.email = company.email;
        }
        else if (array[i].localeCompare("owner") == 0) {
            jsonObj.owner = company.owner;
        }
        else if (array[i].localeCompare("phoneNumber") == 0) {
            jsonObj.phoneNumber = company.phoneNumber;
        }
        else if (array[i].localeCompare("location") == 0) {
            jsonObj.location = company.location;
        }
        else if (array[i].localeCompare("all") == 0) {
            jsonObj = company;
        }
    }
}

/**
 * Does the same thing as getCompanyData but with a string as input
 * @param {*} company 
 * @param {*} str 
 */
function getCompanyDataStr(company, str, jsonObj) {
    //compares str to valid select values and assings jsonObj.select the correct value from company
    if (str.localeCompare("id") == 0) {
        jsonObj.id = company.id;
    }
    else if (str.localeCompare("name") == 0) {
        jsonObj.name = company.name;
    }
    else if (str.localeCompare("email") == 0) {
        jsonObj.email = company.email;
    }
    else if (str.localeCompare("owner") == 0) {
        jsonObj.owner = company.owner;
    }
    else if (str.localeCompare("phoneNumber") == 0) {
        jsonObj.phoneNumber = company.phoneNumber;
    }
    else if (str.localeCompare("location") == 0) {
        jsonObj.location = company.location;
    }
    else if (str.localeCompare("all") == 0) {
        jsonObj = company;
    }
}
/**
 * Checks whether the select array contains valid values
 * @param {} array 
 * @returns true if array contains valid select values
 */
function isValidSelectArray(array) {
    console.log("IN ISVALID SELCET ARR");
    for (let i = 0; i < array.length; i++) {
        //checks to see if the values stored in selects are valid data values
        if (!(array[i].localeCompare("id") ==0) && !(array[i].localeCompare("name")==0)
        && !(array[i].localeCompare("email")==0) && !(array[i].localeCompare("owner")==0)
        && !(array[i].localeCompare("phoneNumber")==0) && !(array[i].localeCompare("location")==0)
        && !(array[i].localeCompare("all")==0)) {
        return false;
    }
    }
    return true;
}
/**
 * Checks whether the select str contains a valid value
 * @param {*} str 
 * @returns true if str contains a valid select value 
 */
function isValidSelectStr(str) {

    if (!(str.localeCompare("id") == 0) && !(str.localeCompare("name") == 0)
        && !(str.localeCompare("email") == 0) && !(str.localeCompare("owner") == 0)
        && !(str.localeCompare("phoneNumber") == 0) && !(str.localeCompare("location") == 0)
        && !(str.localeCompare("all")) == 0) {
        return false;
    }
    return true; 
}

async function getCompany(req, res, next) {
    let company = undefined; //company object
    try {
    company = await Company.find({'compId' : req.params.id}) //finding company document in db with matching compId
    if(company.compId === undefined) { //simple validation
     console.log("ERROR") 
     return res.status(404).json('cannot find company')
     }
    } catch(err) {
        return res.status(500).json(err.message)
    }

    res.company = company //assigning company to res value so it can be accessed in other functions
    next()
}





module.exports = { replaceCompany, isValidId, removeFromArray, isIdDuplicate, isCompanyValid, getCompanyData, isValidSelectArray, isValidSelectStr, getCompanyDataStr, getCompany };