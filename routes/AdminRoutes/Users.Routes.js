const app = require("express").Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../../middleware/authentication");
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} = require("../../controllers/Admin/User.controller");

app.get("/user/:id ", authenticateUser, getUser);
app.get(
  "/getAllUsers",
  authenticateUser,
  authorizePermissions("admin"),
  getAllUsers
);
app.delete(
  "/Delete",
  authenticateUser,
  authorizePermissions("admin"),
  deleteUser
);
app.put("/Update", authenticateUser, authorizePermissions("admin"), updateUser);
app.post(
  "/Create",
  authenticateUser,
  authorizePermissions("admin"),
  createUser
);

module.exports = app;
