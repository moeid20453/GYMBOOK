const express = require("express");
const app = express();

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();


app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.listen(8800, () => {
  console.log("Backend server is running!");
});