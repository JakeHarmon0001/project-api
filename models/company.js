/**
 * Schema for company documents
 */

const db = require("../database/db.js")

const companySchema = new db.mongoose.Schema({
  compId: { type: String, required: true },
  name: { type: String, required: true }, 
  email: { type: String, required: true },
  owner: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true }
  
});

module.exports = db.mongoose.model('Company', companySchema);