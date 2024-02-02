let mongoose = require("mongoose");

let postSchema = mongoose.Schema({
  userid: String,
  UserName: String,
  content: String,
  cat: { type: String, enum: ["GymTalk", "GeneralTalk"] },
  date: String,
  img: Object,
});

let postModel = mongoose.model("userposts", postSchema);

module.exports = postModel;
