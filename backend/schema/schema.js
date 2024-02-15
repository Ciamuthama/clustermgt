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
  
  district: {
    type: String,
  },
  cluster: [String],
  cluster_leader: {
    type: String,
  },
  join_date:{
    type: Date,
  },
  profile:{
    type:String
  }
});

const memberSchema = mongoose.model("Member", newSchema);

module.exports = memberSchema;
