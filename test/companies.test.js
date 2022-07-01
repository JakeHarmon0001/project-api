/**
 * Contains test for functions in companies
 * @author Jake Harmon
 */

const request = require("supertest")
jest.setTimeout(1000000)
jest.useFakeTimers();
const app = require("../app")

/**
 * +Testing get function 
 */
describe("GET test", () => {
  test("GET /", (done) => {
    request(app)
    .get("/companies/0001")
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      return done()
    })
  })
})

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
describe("POST test", () => {
  test("Post /", (done) => {
    request(app)
    .post("/companies")
    // .expect("Content-Type", /json/)
    .send({
      id: "0040",
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

describe("POST FAIL test", () => {
  test("Post FAIL /", (done) => {
    request(app)
    .post("/companies")
    // .expect("Content-Type", /json/)
    .send({
      id: "0010",
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

/**
 * +Testing Delete function
 */
describe("DELETE test", () => {
  test("Delete /", (done) => {
    request(app)
    .delete("/companies/0001")
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
      return done()
    })
  })
})

describe("DELETE FAIL test", () => {
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
 * +Testing put function 
 */
describe("PUT test", () => {
  test("PUT /", (done) => {
    request(app)
    .put("/companies")
    .send({
      id: "0010",
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

describe("PUT FAIL test", () => {
  test("PUT FAIL /", (done) => {
    request(app)
    .put("/companies")
    .send({
      id: "0030",
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