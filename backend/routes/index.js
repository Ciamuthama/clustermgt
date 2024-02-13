const express = require("express");
const memberSchema = require("../schema/schema");

const routes = express.Router();

routes.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http:localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});

routes.get("/", (req, res) => {
  memberSchema
    .find()
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
});

routes.post("/new", (req, res) => {
  const newMember = new memberSchema(req.body);

  newMember
    .save()
    .then(() => {
        res.status(200).json({ message: "Member added successfully" });
    })
    .catch((error) => console.log(error));
});

routes.get("/:id", (req, res) => {
  const id = req.params.id;

  memberSchema
    .findById(id)
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
});

module.exports = routes;
