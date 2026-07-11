const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getPlaces,
} = require("../controllers/placeController");

router.get("/:id", protect, getPlaces);

module.exports = router;