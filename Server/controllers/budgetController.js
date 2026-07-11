const Itinerary = require("../models/Itinerary");

const {
    estimateBudget,
} = require("../services/groqService");

const generateBudget = async (req, res) => {

    try {

        const { itineraryId } = req.body;

        const trip = await Itinerary.findById(itineraryId);

        if (!trip) {
            return res.status(404).json({
                message: "Itinerary not found",
            });
        }

        // Already generated?
        if (trip.budget) {
            return res.status(200).json({
                budget: trip.budget,
            });
        }

        const budget = await estimateBudget(
            trip.itinerary
        );

        trip.budget = budget;

        await trip.save();

        res.status(200).json({
            budget,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    generateBudget,
};