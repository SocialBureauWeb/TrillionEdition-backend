// routes/eventRoutes.js
const express = require('express');
const                     router = express.Router();

const {
  createEvent,
  getEvents,
  getEventBySlug
} = require('../controllers/eventController');

const upload = require('../middlewares/cloudinary');

router.post('/add', upload.single('image'), createEvent);
router.get('/list', getEvents);

router.get('/:slug', getEventBySlug);

module.exports = router;
