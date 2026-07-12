const Itinerary = require("../models/Itinerary");

const generateBudget = async (req, res) => {

    try {

        const { itineraryId } = req.body;

        const trip = await Itinerary.findById(itineraryId);

        if (!trip) {
            return res.status(404).json({
                message: "Itinerary not found",
            });
        }

        res.status(200).json({
            budget: trip.budget,
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