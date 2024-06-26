require("dotenv").config();
const express = require("express");
const bodyparse = require("body-parser")
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const Route =  require("./routes/index.js")

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyparse.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  

  next();
}); 

let gfs;

mongoose
  .connect(process.env.API_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  })

  app.use('/', Route)

const listener = app.listen( 3000, () => {
    console.log(`connected to server ` + listener.address().port)
})
