const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const data = require('./fake-data'); //importing data from fake-data.js

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/company', async function(req,res)  {

  let id = req.query.id;
  let name = '';
  for( i = 0; i < data.fakeData.length; i++) { //iterates over the fakeData array looking for id match
    if(id == data.fakeData[i].id) {
      name = data.fakeData[i].name; // if there is a match sets name variable
      break;
    }
  }
  if(name == '') { name = "Invalid ID";}
  res.send("Company: " + name);    
})


app.get('/company/:id', (req,res) => {

  let id = req.params.id
  let name = '';
  for(i = 0; i < data.fakeData.length; i++) {  //iterates over the fakeData array looking for id match
    if(id == data.fakeData[i].id) {
      name = data.fakeData[i].name; // if there is a match sets name variable
      break;
    }
  }
  if(name == undefined) { name = "Invalid ID";}
  res.send("Company: " + name);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

