const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new Schema({
  member_no: {
    type: Number,
  },
  name: {
    type: String,
  },
  id: {
    type: Number,
  },
  telephone: {
    type: Number,
  },
  date_of_join: {
    type: Date,
  },
  district: {
    type: String,
  },
  cluster: {
    type: String,
  },
  cluster_leader: {
    type: String,
  },
});

const memberSchema = mongoose.model("Member", newSchema);

module.exports = memberSchema;
