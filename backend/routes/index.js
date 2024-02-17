const express = require("express");
const memberSchema = require("../schema/schema");
const multer = require("multer");

const routes = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

routes.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
  res.sendStatus(200);
});

routes.get("/", (req, res) => {
  memberSchema
    .find()
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
});

routes.post("/new", upload.single("profile"), (req, res) => {
  const newMember = new memberSchema({
    body:req.body,
    profile: req.files,
    cluster: req.body.cluster,
  });



  newMember
    .save()
    .then((results) => {
      res.status(200).json({ message: "Member added successfully", results });
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

routes.patch("/:id", upload.single("profile"),async (req, res) => {
  const id = req.params.id;
  try {
    const updatedMember = await memberSchema.findByIdAndUpdate(id, req.body, req.files, {
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
