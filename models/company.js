const mongoose = require("mongoose");
// const { Schema, model } = mongoose;

const companySchema = new mongoose.Schema({
  compId: { type: String, required: true },
  name: { type: String, required: true }, 
  email: { type: String, required: true },
  owner: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true }
  
});


//companySchema.index({id: "test", name: "test", email: "test", owner: "test", phoneNumber: "test", location: "test"});
module.exports = mongoose.model('Company', companySchema);
//module.exports =  {companyModel, companySchema};