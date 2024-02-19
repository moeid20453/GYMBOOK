const app = require("express").Router();
const {
  addUserValidation,
  confirmPasswordVlidation,
  updateUserValidation,
} = require("../../validation/User.Validation");
const { validator } = require("../../validation/Common.validator");

const {
  register,
  login,
  logout,
  activateUser,
} = require("../../controllers/Client/Auth.controller");
const {updateUser} = require("../../controllers/Client/User.controller")

app.post("/register", validator(addUserValidation), register);
app.post("/login", validator(confirmPasswordVlidation), login);
app.post("/update:id", validator(updateUserValidation), updateUser);
app.get("/activate-User/:token", activateUser);
app.get("/logout", logout);

module.exports = app;
