const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const newSchema = new Schema({
  member_no: {
    type: String,
  },
  name: {
    type: String,
  },
  id: {
    type: String,
  },
  telephone: {
    type: String,
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
    default:Date.now()
  },
  profile:{
    type:String
  }
},{timestamps:true});

const memberSchema = mongoose.model("Member", newSchema);

module.exports = memberSchema;
