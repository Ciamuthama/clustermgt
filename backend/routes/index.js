const express = require("express");
const memberSchema = require("../schema/schema");
const multer = require("multer");
const fs = require('fs');

const routes = express.Router();
const storage = multer.memoryStorage()

const upload = multer({ storage })

routes.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
      member_no: req.body.member_no,
      name: req.body.name,
      id: req.body.id,
      telephone: req.body.telephone,
      district: req.body.district,
      cluster: req.body.cluster,
      cluster_leader: req.body.cluster_leader,
      join_date: req.body.join_date,
      profile: req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype
      } : undefined,
  });



  newMember
    .save()
    .then((results) => {
      res.status(200).json({ message: "Member added successfully", results });
      res.redirect("/")
    })
    .catch((error) => console.log(error));
});

routes.get("/profile/:id", (req, res) => {
  const id = req.params.id;

  memberSchema.findById(id)
    .then(result => {
      if (!result || !result.profile || !result.profile.data) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.contentType(result.profile.contentType);
      res.send(result.profile.data);
    })
    .catch(err => res.status(500).json({ error: `Internal Server Error: ${err.message}` }));
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
      // Delete the associated file
      const filePath = path.join(__dirname, `uploads/${result.profile}`);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          res.status(500).json("Error deleting file");
        } else {
          res.json("Member and associated file successfully deleted");
        }
      });
    })
    .catch((err) => {
      res.status(404).json(`ERROR: ${err}`);
    });
});


module.exports = routes;
