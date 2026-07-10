const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const extractPdfText = require("../services/pdfService");
const protect = require("../middleware/authMiddleware");


const {
    createItinerary,
    getItineraries,
    uploadAndGenerate,
    deleteItinerary,
    getSingleItinerary,
    renameItinerary,
} = require("../controllers/itineraryController");

router.post(
    "/upload",
    protect,
    upload.single("document"),
    uploadAndGenerate
);

router.post("/generate", protect, createItinerary);
router.get("/history", protect, getItineraries);
router.get("/:id", protect, getSingleItinerary);
router.patch("/:id", protect, renameItinerary);
router.delete("/:id", protect, deleteItinerary);


module.exports = router;