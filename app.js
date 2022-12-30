require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyPaser = require("body-parser");

const app = express();
app.set("view engine","ejs");

const movieController = require("./controllers/movie");

const { MONGODB_URI } = process.env;

mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(err);
  process.exit();
});

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: false}));

app.get("/", (req,res) =>{
    res.render("index");
});
app.post("/add-movie", movieController.create);
app.get("/add-movie", (req,res) =>{
    res.render("add-movie");
});
app.get("/allmovies", movieController.list);
app.get("/allmovies/delete/:id", movieController.delete);



app.listen(2000, () =>{
    console.log('http://localhost:2000');
});