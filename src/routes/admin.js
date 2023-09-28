const express = require("express");

const router = express.Router();
const adminsController = require("../controller/admin");

router.get("/", adminsController);

// routes/index.js

// Import controller
const AdminController = require("./controllers/admin");

// Route untuk login
router.post("/login", AdminController.login);

module.exports = router;
