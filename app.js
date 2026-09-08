var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var path = require('path');
const cors = require("cors");

// DB
require('./database/db');

// Routers
var indexRouter = require('./routes/index');
var contactRouter = require('./routes/contactRoutes');
const eventRouter = require("./routes/eventRoutes");
const eventRegisterRoutes = require("./routes/eventRegisterRoutes");
const blogRoutes = require("./routes/blogRoutes");
var app = express();

// CORS
app.use(cors({
  origin: ["http://localhost:5173", "https://trillionedition.com", "https://13.207.200.198.nip.io/trillion", "https://www.trillionedition.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ROUTES (VERY IMPORTANT ORDER)
app.use("/blogs", blogRoutes);
app.use('/api/event', eventRouter);   
app.use('/api/events', eventRegisterRoutes);
app.use('/api/contact', contactRouter);
app.use('/', indexRouter);

// // 404
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// ERROR HANDLER
app.use(function(err, req, res, next) {
  // Handle Multer file upload errors gracefully
  if (err && err.name === 'MulterError') {
    // e.g., file too large, invalid file type
    return res.status(400).json({ message: err.message || 'File upload error' });
  }

  // Log server-side errors for debugging (optional)
  console.error('Error:', err && err.stack ? err.stack : err);

  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(5000, () => console.log("Server running on port 5000"));

module.exports = app;
