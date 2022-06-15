const data = require('./Data/fake-data');
const express = require('express');
/**
 * Tests whether the given id is valid 
 * @param {*} id 
 * @returns 
 */
function isValidId(id) {
    let isValid = true;
    if (id == undefined) {
        return false;
    }
    else if (isNaN(id)) {
        return false;
    }
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
 * @returns 
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
 * @returns 
 */
function isCompanyValid(company) {

    if (company.name == undefined || company.id == undefined || company.email == undefined || company.owner == undefined || company.phoneNumber == undefined || company.location == undefined) {
        return false;
    }
    return true;
}
/**
 * returns the desired company data listed in array from company in a new object
 * @param {*} company 
 * @param {*} array 
 * @returns 
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
 * @returns 
 */
function getCompanyDataStr(company, str, jsonObj) {
    //compares str to valid select values and assings jsonObj.select the correct value from company
    if (str.localeCompare("id") == 0) {
        jsonObj.id = company.id;
        //return tempJson;
    }
    else if (str.localeCompare("name") == 0) {
        jsonObj.name = company.name;
        // return tempJson;
    }
    else if (str.localeCompare("email") == 0) {
        jsonObj.email = company.email;
        //return tempJson;
    }
    else if (str.localeCompare("owner") == 0) {
        jsonObj.owner = company.owner;
        //return tempJson;
    }
    else if (str.localeCompare("phoneNumber") == 0) {
        jsonObj.phoneNumber = company.phoneNumber;
        //return tempJson;
    }
    else if (str.localeCompare("location") == 0) {
        jsonObj.location = company.location;
        //return tempJson;
    }
    else if (str.localeCompare("all") == 0) {
        jsonObj = company;
        //return tempJson;
    }

}
/**
 * Checks whether the select array contains valid values
 * @param {} array 
 * @returns 
 */
function isValidSelectArray(array) {
    for (let i = 0; i < array.length; i++) {
        //checks to see if the values stored in selects are valid data values
        if (!(array[i].localeCompare("id")) || !(array[i].localeCompare("name"))
            || !(array[i].localeCompare("email")) || !(array[i].localeCompare("owner"))
            || !(array[i].localeCompare("phoneNumber")) || !(array[i].localeCompare("location"))
            || !(array[i].localeCompare("all"))) {
            return false;
        }
    }
    return true;
}
/**
 * Checks whether the select str contains a valid value
 * @param {*} str 
 * @returns 
 */
function isValidSelectStr(str) {

    if (!(str.localeCompare("id")) || !(str.localeCompare("name"))
        || !(str.localeCompare("email")) || !(str.localeCompare("owner"))
        || !(str.localeCompare("phoneNumber")) || !(str.localeCompare("location"))
        || !(str.localeCompare("all"))) {
        return false;
    }
    return true;
}




module.exports = { replaceCompany, isValidId, removeFromArray, isIdDuplicate, isCompanyValid, getCompanyData, isValidSelectArray, isValidSelectStr, getCompanyDataStr };