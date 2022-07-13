/**
 * Contains some authentication middleware
 */

const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")
const accessTokenSecret = '61021'


async function authenticateJWT (req, res, next) {
    const authHeader = req.headers.authorization
    
    if (authHeader) {
      const token = authHeader.split(" ")[1]
  
      jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403)
        }
        req.user = user
        next()
      })
    } else {
      res.sendStatus(401)
    }
  }

const users = [
    {
        username: 'jake',
        password: 'password123jake',
        role: 'admin'
    }, {
        username: 'courtney',
        password: 'password123courtney',
        role: 'admin'
    }
]

module.exports = {authenticateJWT, accessTokenSecret}