let User = require("../modules/User/User.Model");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const day = 3600000 * 24;
let { generateToken } = require("../utilities/token.util");
let { sendMail } = require("../utilities/emailer.util");

let updateUser = async (req, res) => {
  let userid = req.params.id;
  let { firstName, lastName, email, password } = req.body;
  let user = await User.findByIdAndUpdate(
    { _id: userid },
    { firstName, lastName, email, password }
  );
  res
    .status(200)
    .json({ message: "successfully Updated :D new data is ", user });
};

let Register = async (req, res) => {
  const user = new User(req.body);
  let userActivationToken = await generateToken(user.id);
  await user.save();
  let activationLink = `http://localhost:3000/activateUser/${userActivationToken}`;
  let receiver = req.body.email;
  let subject = "Email Activation :D";
  let text =
    "You have created, Please click this link to activate your account";
  let html = `<a> ${activationLink} </a>`;
  await sendMail(receiver, subject, text, html);
  res.status(200).json({ message: "success" });
};

let Login = async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;
  let user = await User.findOne({ userName });
  console.log(user);
  if (user) {
    var match = await bcrypt.compare(password, user.password);

    if (user.isActive == false)
      return res
        .status(403)
        .json({ message: "check your email for activation link" });
    if (match) {
      let user = await User.findOne({ userName }).select("-password");
      req.session.cookie.expires = new Date(Date.now() + day);
      req.session.cookie.maxAge = day;
      req.session.user = user;
      await req.session.save();
      res.status(200).json({ user });
    }
  } else {
    res.status(400).json({ error: "Incorrect password Or user doesn't exist" });
  }
};
let activateUser = async (req, res) => {
  let token = req.params.token;
  jwt.verify(token, process.env.TOKEN_SECRET, async function (err, decoded) {
    if (err) {
      res.status(400).json({ message: "Incorrect Token" });
    } else {
      await User.findByIdAndUpdate(decoded, { isActive: true });
      res.status(200).json({ message: "successfully Activated your Account" });
    }
  });
};
let Logout = async (req, res) => {
  req.session.destroy(() => {
    console.log("session removed");
  });
  res
    .clearCookie("connect.sid", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("");
};

module.exports = {
  Register,
  Login,
  updateUser,
  activateUser,
  Logout,
};
