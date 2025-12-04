const EventRegistration = require("../models/EventRegistration");

exports.registerForEvent = async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      company, 
      message,
      eventId,
      eventTitle,
      eventDate
    } = req.body;
    console.log("Event Registration Data:", req.body);

    if (!fullName || !email || !phone || !eventId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const reg = await EventRegistration.create({
      fullName,
      email,
      phone,
      company,
      message,
      eventId,
      eventTitle,
      eventDate
    });

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: reg,
    });

  } catch (err) {
    console.error("Event Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
