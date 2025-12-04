// routes/eventRegisterRoutes.js
const express = require("express");
const router = express.Router();
const { registerForEvent } = require("../controllers/eventRegisterController");

router.post("/register", registerForEvent);

module.exports = router;
                    