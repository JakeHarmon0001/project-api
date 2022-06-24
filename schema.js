const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const companySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }, 
  email: { type: String, required: true },
  owner: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true }
  
});


const companyModel = model('Company', companySchema);
module.exports =  {companyModel, companySchema};