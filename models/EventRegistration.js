const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    eventTitle: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventRegistration", eventRegistrationSchema);