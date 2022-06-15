/**
 * Contains middleware functions to be used in app.js and companies.js
 */

/**
 * Prints errors and their messages to the screen
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errorResponder = (err, req, res, next) => {
    res.header("Content-Type", 'application/json');
    res.status(err.statusCode).send(JSON.stringify(err.message, null, 4)); // pretty print
}

/**
 * Logs errors in the console
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errorLogger = (err, req, res, next) => {
  console.error('\x1b[35m', err) ;// adding some color to our logs
  next(err); // calling next middleware
}

const invalidPathHandler = (req, res, next) => {
  res.redirect('/error');
  res.send("TEST");
}


module.exports = {errorResponder,errorLogger,invalidPathHandler};