// Here is where we import modules
// We begin by loading Express
const dotenv = require('dotenv').config()
require('./config/database.js')

const express = require('express');
const morgan = require('morgan');

const app = express();

// models 

require('./models/fruit.js')





// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
// ROUTES

// app.get('/',(req,res)=>{
//     res.send();
// });

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  

app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});


app.post("/fruits", async (req, res) => {
  console.log(req.body);
  res.redirect("/fruits/new");
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});