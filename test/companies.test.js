/**
 * Contains test for functions in companies.js
 * @author Jake Harmon
 */

const request = require("supertest")
jest.setTimeout(1000000)
const app = require("../app")
jest.useRealTimers() //using real timers so the tests work with the db
/**
 * +Testing get function 
 */
describe("GET test", () => {
  test("GET /", (done) => {
    request(app)
    .get("/companies/0101")
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      return done()
    })
  })
 
})

jest.useRealTimers()
describe("GET FAIL test", () => {
  test("GET FAIL /", (done) => {
    request(app)
    .get("/companies/1000")
    .expect(404)
    .end((err, res) => {
      if (err) return done(err)
      return done()
    })
  })
})


/**
 * +Testing post function
 */
 jest.useRealTimers()
describe("POST test", () => {
  test("Post /", (done) => {
    request(app)
    .post("/companies")
    .send({
      compId: "0063",
      name: "Test Company",
      email: "Test@gmail.com",
      owner: "Larry Selensky",
      phoneNumber: "(800) 800 8000",
      location: "Knowwhere"
    })
    .expect(201)
    .end((err, res) => {
      if (err) return done(err)
      return done()
    })
  })
})

jest.useRealTimers()
describe("POST FAIL test", () => {
  test("Post FAIL /", (done) => {
    request(app)
    .post("/companies")
    .send({
      compId: "0050",
      name: "Test Company",
      email: "Test@gmail.com",
      owner: "Larry Selensky",
      phoneNumber: "(800) 800 8000",
      location: "Knowwhere"
    })
    .expect(401)
    .end((err, res) => {
      if (err) return done(err)
      return done()
    })
  })
})

/**
 * +Testing Delete function
 */
  jest.useRealTimers()
 describe("DELETE test", () => {
   test("Delete /", (done) => {
     request(app)
     .delete("/companies/0063")
     .expect(200)
     .end((err, res) => {
       if (err) return done(err)
       return done()
     })
   })
 })

describe("DELETE FAIL test", () => {
  jest.useRealTimers()
  test("Delete FAIL /", (done) => {
    request(app)
    .delete("/companies/0000")
    .expect(404)
    .end((err, res) => {
      if (err) return done(err)
      return done()
    })
  })
})

/**
 * +Testing patch function 
 */
describe("PATCH test", () => {
  jest.useRealTimers()
  test("PATCH /", (done) => {
    request(app)
    .patch("/companies/0070")
    .send({
      name: "Test Company",
      email: "Test@gmail.com",
      owner: "Larry Selensky",
      phoneNumber: "(800) 800 8000",
      location: "Knowwhere"
    })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      return done()
    })
  })
})

describe("PATCH FAIL test", () => {
  jest.useRealTimers()
  test("PATCH FAIL /", (done) => {
    request(app)
    .patch("/companies/1000")
    .send({
      name: "Test Company",
      email: "Test@gmail.com",
      owner: "Larry Selensky",
      phoneNumber: "(800) 800 8000",
      location: "Knowwhere"
    })
    .expect(404)
    .end((err, res) => {
      if (err) return done(err)
      return done()
    })
  })
})
