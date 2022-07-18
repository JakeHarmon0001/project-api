/**
 * +Route for /companies URLs, handles different HTML functions
 * @author Jake Harmon
 */

const express = require("express")
const router = express.Router()
const dotenv = require("dotenv").config()
const utility = require("../Utilities.js") //importing functions from Utilities.js
const Company = require("../models/company") //importing model for database documents
const db = require("../database/db.js") //database variable
const jwt = require("jsonwebtoken")
const auth = require("../auth.js")


const accessTokenSecret = '61021'
/**
 *>GET Allows client to get the data of specific companies or all companies
 */
router.get("", auth.authenticateJWT, async (req, res, next) => {
    //returns all companies in database


  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;


    // execute query with page and limit values
    try {

        const company = await Company.find()
      .limit(10)
      .skip((page - 1) * limit)
      .exec();

      const count = await Company.countDocuments()
        const companies = await Company.find() //finds all documents mathcing copmany schema
        res.status(200).json( {company,
            currentPage: page,
            totalPages: Math.ceil(count / limit)})
    } catch (err) {
        console.error(err)
        // handle the error
    }
})

router.get("/:id",auth.authenticateJWT, idValidate, getCompany, compExists, async (req, res, next) => {
    //returns a company from the database
    
    
    try {
        res.status(200).send(res.company) //sending company in response 
    } catch (err) {
        next(err)
    }
})

/**
 *>POST Allows the client to post a new company object into the fakeData array
 */
router.post("/",auth.authenticateJWT, putValidate, isDuplicateDoc,  async (req, res, next) => {
    const company = new Company({ //creating new company document
        compId: req.body.compId,
        name: req.body.name,
        email: req.body.email,
        owner: req.body.owner,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
    })
    try {
        const newCompany = await company.save() //saving new document to database
        res.status(201).json({ message: "New company document created" })
    } catch (err) {
        next(err)
    }
})

/**
 *>DELETE Allows the client to delete a company object that is in the fakeData array
 */
router.delete("/:id",auth.authenticateJWT, idValidate, getCompany, async (req, res) => {
   // try {
        const outcome = await Company.deleteOne({ compId: req.params.id }) //deleting document from database
        res.status(200).json({ message: "Document deleted succesfully" })
    // } catch (err) {
    //     next(err)
    // }
})

/**
 *>PATCH Allows the client to change instance variables of a company currently in the fakeData array
 */
router.patch("/:id",auth.authenticateJWT, idValidate, patchValidate, getCompany, isDuplicateDoc,  async (req, res) => {
    const update = req.body
    await Company.updateOne( //updating document with updates passed in the body 
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
 *=Function used to test if an id is valid
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
 *=Function that tests whether a query is valid
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
 *=Function that tests whether a put is valid
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
    }
    else if(!utility.isValidId(curr.compId)) {
        next(new InvalidIdError(curr.compId))
    } else {
        next()
    }
}

/**
 *=Function that tests whether a patch is valid
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
    }
    else if(curr.compId != undefined && !(utility.isValidId(curr.compId))) {
        next(new InvalidIdError(curr.compId))
    } else {
        next()
    }
}

/**
 *=Function that retrieves a company document based on the id given
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
async function getCompany(req, res, next) {
    let company = undefined //company object
    try {
        company = await Company.find({ compId: req.params.id }) //finding company document in db with matching compId
        if (company.length == 0) {
            //simple validation, checks cursor length to see if empty
            next(new DoesntExistError(id))
        }
        console.log(JSON.stringify(company))
        res.company = company
        next()
    } catch (err) {
        next(new DoesntExistError(req.params.id))
        // next(new DoesntExistError(req.params.id))
    }
     res.company = undefined //assigning company to res value so it can be accessed in other functions
    // next()
}

/**
 *=Function that throws and error if a company doc with already exists with the same compId
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
async function isDuplicateDoc(req,res,next) {
    let company = undefined //company object
    try {
        company = await Company.find({ compId: req.body.compId }) //finding company document in db with matching compId
        if (company.length != 0) {
            //simple validation, checks cursor length to see if empty
            next(new DuplicateError(req.body.compId))
        }
    } catch (err) {
        next(err)
    }
    next()
}

async function compExists(req,res,next) {

        console.log("test")
    
    if(JSON.stringify(res.company).localeCompare("{}") == 0) {
        next(new DoesntExistError(req.params.id))
    }
    else {
        next()
    }
}

// async function authenticateJWT (req, res, next) {
//     const authHeader = req.headers.authorization
    
//     if (authHeader) {
//       const token = authHeader.split(" ")[1]
  
//       jwt.verify(token, accessTokenSecret, (err, user) => {
//         if (err) {
//           return res.sendStatus(403)
//         }
//         req.user = user
//         next()
//       })
//     } else {
//       res.sendStatus(401)
//     }
//   }
router.use(errorLogger) //logs errors
router.use(errorResponder) //responds to errors
module.exports = router
