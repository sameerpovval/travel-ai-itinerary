const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const extractPdfText = require("../services/pdfService");
const protect = require("../middleware/authMiddleware");


const {
    createItinerary,
    getItineraries,
    uploadAndGenerate,
} = require("../controllers/itineraryController");

router.post(
    "/upload",
    protect,
    upload.single("document"),
    uploadAndGenerate
);

router.post("/generate",protect, createItinerary);
router.get("/history",protect, getItineraries);

module.exports = router;