// Here is where we import modules
// We begin by loading Express
const dotenv = require('dotenv').config()
require('./config/database.js')

const express = require('express');
const methodOverride = require("method-override"); // new
const path = require("path");
const morgan = require('morgan');
const Fruit =require('./models/fruit.js')
const app = express();

// models 

// MIDDLEWARE

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
// ROUTES

// app.get('/',(req,res)=>{
//     res.send();
// });

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  // console.log(allFruits); // log the fruits!
  // res.send("Welcome to the index page!");
  res.render("fruits/index.ejs", { fruits: allFruits });
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

app.get("/fruits/:fruitId", async (req,res)=>{
    // const fruitId = req.params.fruitId;
    // const fruit = await allFruits.find(fruitId);
    // res.render('this fruit has this Id', fruitId);
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });

  })
app.delete("/fruits/:fruitId", async (req,res)=>{
    
    const foundFruit = await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
    

  })


app.get("/fruits/:fruitId/edit", async (req,res)=>{
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {fruit:foundFruit});
  })


// server.js

// POST /fruits
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits");
});
app.put("/fruits/:fruitId", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  const fruitId = req.params.fruitId;
  await Fruit.findByIdAndUpdate(fruitId,req.body);
  res.redirect(`/fruits/${fruitId}`);
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});