/**
 * Main app for project-api
 * @author Jake Harmon
 */

const express = require("express")
const app = express()
const port = 3000
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")
const url = require("url")
const querystring = require("querystring")
const dotenv = require("dotenv").config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

const accessTokenSecret = '61021'

app.get("/login", (req, res) => {
  res.send("Hello World!")
})

const companyRouter = require("./routes/companies")
app.use("/companies", companyRouter) //using the company route


const server = app.listen(port, () => {
  console.log(`app.js listening on port ${port}`)
})

module.exports = server


app.post('/login', (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body

  // Filter user from the users array by username and password
  const user = users.find(u => { return u.username === username && u.password === password })

  if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret)
      //req.headers.Authorization = username +  accessToken
     // console.log(req.headers.Authorization)
      
      res.json({
          accessToken
      })
  } else {
      res.send('Username or password incorrect')
  }
})

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

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization

//   if (authHeader) {
//     const token = authHeader.split(" ")[1]

//     jwt.verify(token, accessTokenSecret, (err, user) => {
//       if (err) {
//         return res.sendStatus(403)
//       }

//       req.user = user
//       next()
//     })
//   } else {
//     res.sendStatus(401)
//   }
// }