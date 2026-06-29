const Itinerary = require("../models/Itinerary");
const generateItinerary = require("../services/groqService");
const extractPdfText = require("../services/pdfService");
const extractImageText = require("../services/extractImageText");

const createItinerary = async (req, res) => {
    try {
        const { travelData } = req.body;

        const itinerary = await generateItinerary(travelData);

        const savedItinerary = await Itinerary.create({
            user: req.user._id,
            travelData,
            itinerary,
        });

        res.status(201).json(savedItinerary);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({
            user: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json(itineraries);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const uploadAndGenerate = async (req, res) => {
    try {
        let extractedText = "";

        if (req.file.mimetype === "application/pdf") {
            extractedText = await extractPdfText(req.file.path);

        } else if (
            req.file.mimetype === "image/jpeg" ||
            req.file.mimetype === "image/jpg" ||
            req.file.mimetype === "image/png"
        ) {
            extractedText = await extractImageText(req.file.path);

        } else {
            return res.status(400).json({
                message: "Unsupported file type",
            });
        }

        const itinerary = await generateItinerary(extractedText);

        const savedItinerary = await Itinerary.create({
            user: req.user._id,
            travelData: extractedText,
            itinerary,
        });

        res.status(201).json(savedItinerary);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createItinerary,
    getItineraries,
    uploadAndGenerate,
};