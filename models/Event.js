const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  location: String,
  image: String,
  description: String,
  slug: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
