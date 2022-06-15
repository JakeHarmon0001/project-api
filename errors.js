/**
 * Contains custome error classes that will be thrown in the companies route 
 * @author Jake Harmon 
 */

/**
 * Error for invalid Id's
 */
class InvalidIdError extends Error {
    constructor(id) {
        super();
        this.name = this.constructor.name;
        if(this instanceof LengthError) {
            this.type = 'Incorrectlength';
            this.statusCode = 401;
            let str = 'The ID: '+ id +' is must be four digits long. ';
        }
        else if(this instanceof NaNError) {
            this.type = "NaN";
            this.statusCode = 401;
            this.message =  'The ID: '+ id +' is not a number';
        }
        else if(this instanceof NonExistingError) {
            this.type = "NonExisting";
            this.statusCode = 404;
            this.message = "NO COMPANY EXISTS WITH ID: " + id;
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

class LengthError extends InvalidIdError { }
class NaNError extends InvalidIdError { }
class NonExistingError extends InvalidIdError { }

module.exports = {InvalidIdError,LengthError,NaNError,NonExistingError, InvalidSelectError, InvalidCompanyError};