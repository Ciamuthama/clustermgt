const express = require("express");
const memberSchema = require("../schema/schema");
const multer = require("multer");

const routes = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})



const upload = multer({ storage: storage })



routes.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PATCH");
  next();
});

routes.get("/", (req, res) => {
  memberSchema
    .find()
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
});

routes.post("/new", (req, res) => {
  const newMember = new memberSchema({
    ...req.body,
   
    cluster: req.body.cluster.replace(/\s+/g, "").split(","),
  });

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

routes.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedMember = await memberSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMember) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ error: `Internal Server Error: ${err.message}` });
  }
});

routes.delete("/:id", (req, res) => {
  const id = req.params.id;
  memberSchema
    .findByIdAndDelete(id)
    .then((result) => {
      res.json("Data successfully deleted");
    })
    .catch((err) => {
      res.status(404).json(`ERROR${err}`);
    });
});

module.exports = routes;
