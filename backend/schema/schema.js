const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new Schema({
  member_no: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  telephone: {
    type: Number,
    required: true,
  },
  date_of_join: {
    type: Date,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  cluster: {
    type: String,
    required: true,
  },
  cluster_leader: {
    type: String,
    required: true,
  },
});

const memberSchema = mongoose.model("Member", newSchema);

module.exports = memberSchema