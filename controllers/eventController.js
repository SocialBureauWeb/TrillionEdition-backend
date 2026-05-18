const Event = require("../models/Event");
const slugify = require("slugify");


exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      events
    });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// exports.getEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ _id: -1 });
//     res.json({ events });   // FIXED
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false,
        message: "Event not found" 
      });
    }
    
    res.json({
      success: true,
      event
    });
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// controllers/eventController.js
exports.getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("Looking for slug:", slug);

    const event = await Event.findOne({ slug });

    if (!event) {
      console.log("Event not found for slug:", slug);
      return res.status(404).json({ message: "Event not found" });
    }

    // ✅ Make sure you're sending back properly
    res.status(200).json({ event });  // or just: res.status(200).json(event);
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ message: "Server error" });
  }
};



exports.createEvent = async (req, res) => {
  try {
    const slug = slugify(req.body.title, { lower: true, strict: true });
    console.log("hiii", req.body, "file:", req.file);

    // Add the file URL to the image field
    if (req.file) {
      req.body.image = req.file.location;
    }

    const newEvent = new Event({
      ...req.body,
      slug: slug,
    });
    console.log("New event", req.body, "file:", req.file);
      
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
