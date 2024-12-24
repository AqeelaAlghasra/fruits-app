const mongoose = require("mongoose");
//create the schema
const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
  });
//register the schema and model to DB 
  const Fruit = mongoose.model("Fruit", fruitSchema); 
//export to JS , share it with the rest app 
  module.exports = Fruit;