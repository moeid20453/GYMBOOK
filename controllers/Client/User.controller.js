const User = require("../../modules/User/User.repo");

let updateUser = async (req, res) => {
  let userid = req.params.id;
  let form = req.body;
  let user = await User.update(userid, form);
  res
    .status(200)
    .json({ message: "successfully Updated :D new data is ", user });
};


const getUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.get({ _id: id });
    if (user.success == true) {
      res.status(user.code).json(user.record);
    } else {
      res.status(user.code).json(user.error);
    }
  } catch {
    res.status(500).json({ error: "Unexpected error in the admin controller" });
  }
};

module.exports = {
  getUser,
  updateUser
};
