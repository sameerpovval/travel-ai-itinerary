const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const extractPdfText = require("../services/pdfService");


const {
    createItinerary,
    getItineraries,
    uploadAndGenerate,
} = require("../controllers/itineraryController");

router.post(
    "/upload",
    upload.single("document"),
    uploadAndGenerate
);

router.post("/generate", createItinerary);
router.get("/history", getItineraries);

module.exports = router;