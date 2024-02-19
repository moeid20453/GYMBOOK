const app = require("express").Router();
const { login, logout } = require("../../controllers/Admin/Auth.controller");

app.post("/login", login);
app.get("/logout", logout);

module.exports = app;
