/**
 * Contains custome error classes that will be thrown in the companies route 
 * @author Jake Harmon 
 */
const utility = require("/home/ubuntu/project-api/Utilities.js");
/**
 * Error for invalid id's
 */
class InvalidIdError extends Error {
    constructor(id) {
        super();
        this.name = this.constructor.name;
        if (id.length > 4 || id.length < 4) {
            this.type = 'Length Error';
            this.statusCode = 401;
            this.message = 'Invalid length of ID';
        }
        else if (!(utility.isIdDuplicate(id))) {
            this.type = 'No company attached';
            this.statusCode = 404;
            this.message = 'No company assigned with this id: ' + id;
        }
        else if (id < 0) {
            this.type = 'Less than 0';
            this.statusCode = 401;
            this.message = 'Id entered must be greater than 0';
        }
        else {
            this.statusCode = 418;
            this.message = 'something has went wrong'
        }
    }
}

/**
 * Error for invalid select values
 */
class InvalidSelectError extends Error {
    constructor(select) {
        super();
        this.name = constructor.name;
        this.message = "One or more invalid select value(s): " + select;
        this.statusCode = 401;
    }
}

/**
 * Error for invalid company objects 
 */
class InvalidCompanyError extends Error {
    constructor() {
        super();
        this.name = constructor.name;
        this.message = "Incorrect instance variables entered for company object";
        this.statusCode = 401;
    }
}
/**
 * Error for duplicate id's
 */
class DuplicateError extends Error {
    constructor(id) {

        super();
        this.name = constructor.name;
        this.message = "There is already a company with ID: " + id;
        this.statusCode = 401;
    }
}
/**
 * Error for companies that don't exist
 */
class DoesntExistError extends Error {
    constructor(id) {
        super();
        this.name = constructor.name;
        this.message = "There is no company with ID: " + id;
        this.statusCode = 404;
    }
}
class LengthError extends InvalidIdError { }
class NaNError extends InvalidIdError { }
class NonExistingError extends InvalidIdError { }

module.exports = { InvalidIdError, LengthError, NaNError, NonExistingError, InvalidSelectError, InvalidCompanyError, DuplicateError, DoesntExistError };