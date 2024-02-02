let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let saltrounds = 5;

let userSchema = mongoose.Schema({
  userName: String,
  Bio: String,
  email: String,
  password: String,
  isActive: {
    type: Boolean,
    default: false,
  },
  userPosts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "userposts",
    },
  ],
  role: {
    type: String,
    enum: ["User", "Admin"],
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, saltrounds);
  next();
});

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
