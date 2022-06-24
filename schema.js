const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const companySchema = new Schema({
  id: String,
  name: String, 
  email: String,
  owner: String,
  phoneNumber: String,
  location: String
  
});

const companyModel = model('Company', companySchema);
module.exports =  {companyModel, companySchema};