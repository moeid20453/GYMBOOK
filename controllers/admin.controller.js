let User = require("../modules/User/User.Model");
let bcrypt = require("bcrypt");
const day = 3600000 * 24;

let isExist = async (req, res) => {
  try {
    let userId = req.body.id;
    const user = await User.findById(userId);
    if (user) {
      return {
        success: true,
        data: user,
        code: 200,
      };
    } else {
      return {
        success: false,
        err: "User not found",
        code: 404,
      };
    }
  } catch (err) {
    console.log("Error", err.message);
    return {
      success: false,
      code: 500,
      error: "Unexpected Error",
    };
  }
};
exports.get = async (filter) => {
  try {
    let data = await User.findOne(filter).select("-password");
    if (data) {
      return {
        success: true,
        data: data,
        code: 200,
      };
    } else {
      return {
        success: false,
        code: 404,
        error: "User not found",
      };
    }
  } catch (err) {
    return {
      success: false,
      code: 500,
      error: "Unexpected Error!",
    };
  }
};

let addUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    res.status(200).json({ message: "Successfully added User" });
  } catch {
    res.status(400);
  }
};

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
  Login,
  updateUser,
  Logout,
};
