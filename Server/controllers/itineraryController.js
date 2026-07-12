const Itinerary = require("../models/Itinerary");
const { generateItinerary, askTravelAssistant, extractPlaces,estimateBudget, } = require("../services/groqService");
const extractPdfText = require("../services/pdfService");
const extractImageText = require("../services/extractImageText");

const createItinerary = async (req, res) => {
    console.log(req.data, "..")

    try {
        const { travelData } = req.body;

        const itinerary = await generateItinerary(travelData);

        const savedItinerary = await Itinerary.create({
            user: req.user._id,
            title: "Travel Itinerary",
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

        const places = await extractPlaces(itinerary);

        const budget = await estimateBudget(itinerary);

        const savedItinerary = await Itinerary.create({
            user: req.user._id,
            title: "Travel Itinerary",
            travelData: extractedText,
            itinerary,
            places,
            budget,
        });

        res.status(201).json(savedItinerary);

    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

const getSingleItinerary = async (req, res) => {
    try {

        const itinerary = await Itinerary.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!itinerary) {
            return res.status(404).json({
                message: "Itinerary not found",
            });
        }

        res.status(200).json(itinerary);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const renameItinerary = async (req, res) => {

    try {

        const { title } = req.body;

        const itinerary = await Itinerary.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
            },
            {
                title,
            },
            {
                new: true,
            }
        );

        if (!itinerary) {
            return res.status(404).json({
                message: "Itinerary not found",
            });
        }

        res.json(itinerary);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

const deleteItinerary = async (req, res) => {
    try {

        const itinerary = await Itinerary.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!itinerary) {
            return res.status(404).json({
                message: "Itinerary not found",
            });
        }

        await itinerary.deleteOne();

        res.status(200).json({
            message: "Itinerary deleted successfully",
        });

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
    deleteItinerary,
    getSingleItinerary,
    renameItinerary,
};