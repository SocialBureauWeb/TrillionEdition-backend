const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

module.exports = mongoose;
