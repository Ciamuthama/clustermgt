const express = require("express");
const morgan = require("morgan");
const memberSchema = require("../schema/schema")

const routes = express.Router();
 
routes.get("/", (req, res) => {
    memberSchema.find()
    .then((results)=>req.json(results))
    .catch((err)=>console.log(err))
    return res.status(200).json({ message: "Welcome to the API" });
});

module.exports = routes;

