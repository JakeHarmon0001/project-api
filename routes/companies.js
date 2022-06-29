/**
 * Route for /companies URLs, handles different HTML functions
 * @author Jake Harmon
 */
const express = require("express")
const router = express.Router()
const dotenv = require("dotenv").config()
const utility = require("../Utilities.js") //importing functions from Utilities.js
const Company = require("../models/company")//importing model for database documents

// Connecting to database
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to database"))

/**
 *+GET Allows client to get the data of specific companies
 */
router.get("", async (req, res) => {
    //returns all companies in database
    try {
        const companies = await Company.find() //finds all documents mathcing copmany schema
        res.status(200).json(companies)
    } catch (error) {
        console.error(error)
        // handle the error
    }
})


router.get("/:id", queryValidate, idValidate, getCompany, async (req, res) => {
    //returns a company from the database
    try {
        res.status(200).send(res.company)
    } catch (error) {
        res.send(err);
    }
})

/**
 *+POST Allows the client to post a new company object into the fakeData array
 */
router.post("/", putValidate, async (req, res) => {
    const company = new Company({
        compId: req.body.compId,
        name: req.body.name,
        email: req.body.email,
        owner: req.body.owner,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
    })
    try {
        const newCompany = await company.save()
        res.status(201).json(newCompany)
    } catch (error) {
        next(new InvalidCompanyError())
    }
})

/**
 *+DELETE Allows the client to delete a company object that is in the fakeData array
 */
router.delete("/:id", idValidate, getCompany, async (req, res) => {
    try {
        const outcome = await Company.deleteOne({ compId: req.params.id })
        res.status(200).json(outcome)
    } catch (err) {
        res.status(404).json("Unable to delete document")
    }
})

/**
 *+PATCH Allows the client to change instance variables of a company currently in the fakeData array
 */
router.patch(
    "/:id",
    idValidate,
    patchValidate,
    getCompany,
    async (req, res) => {
        const update = req.body
        db.collection("companies").updateOne(
            { compId: req.params.id },
            { $set: update }
        )
        res.json({ message: "document succesfuly updated" })
    }
)

const {
    errorResponder,
    errorLogger,
    invalidPathHandler,
} = require("../middleware.js")

const {
    LengthError,
    NaNError,
    NonExistingError,
    InvalidSelectError,
    InvalidCompanyError,
    InvalidIdError,
    DuplicateError,
    DoesntExistError,
} = require("../errors")


/**
 *-Function used to test if an id is valid
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
function idValidate(req, res, next) {
    if (!utility.isValidId(req.params.id)) {
        //makes sure the id is valid
        next(new InvalidIdError(req.params.id))
    } else {
        //else moves on
        next()
    }
}
/**
 *-Function that tests whether a query is valid
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
function queryValidate(req, res, next) {
    if (req.query.select === undefined) {
        //if there is no query, moves on
        next()
    } else {
        if (
            Array.isArray(req.query.select) &&
            !utility.isValidSelectArray(req.query.select)
        ) {
            // case for multiple selects
            next(new InvalidSelectError(req.query.select))
            console.log("invalid array select test")
        } else if (
            typeof req.query.select !== Array &&
            !utility.isValidSelectStr(req.query.select)
        ) {
            //case for one select
            next(new InvalidSelectError(req.query.select))
            console.log("invalid 0str select test")
        } else {
            //else, moves on
            next()
        }
    }
}


/**
 *-Function that tests whether a put is valid
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
function putValidate(req, res, next) {
    const curr = req.body
    if (
        curr.compId == undefined ||
        curr.name == undefined ||
        curr.email == undefined ||
        curr.owner == undefined ||
        curr.location == undefined ||
        curr.phoneNumber == undefined
    ) {
        next(new InvalidCompanyError())
    } else {
        next()
    }
}

/**
 *-Function that tests whether a patch is valid
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
function patchValidate(req, res, next) {
    const curr = req.body
    if (
        curr.compId == undefined &&
        curr.name == undefined &&
        curr.email == undefined &&
        curr.owner == undefined &&
        curr.location == undefined &&
        curr.phoneNumber == undefined
    ) {
        next(new InvalidCompanyError())
    } else {
        next()
    }
}

/**
 *-Function that retrieves a company document based on the id given 
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
async function getCompany(req, res, next) {
    let company = undefined //company object
    let obj = undefined

    try {
        company = await Company.find({ compId: req.params.id }) //finding company document in db with matching compId
        if (company.length == 0) {
            //simple validation, checks cursor length to see if empty
            next(new DoesntExistError(id))
        }
    } catch (err) {
        res.json(err)
        // next(new DoesntExistError(req.params.id))
    }
    res.company = company //assigning company to res value so it can be accessed in other functions
    next()
}
router.use(errorLogger) //logs errors
router.use(errorResponder) //responds to errors
module.exports = router
