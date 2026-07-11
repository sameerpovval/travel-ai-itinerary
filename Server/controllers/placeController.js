const Itinerary = require("../models/Itinerary");

const {
    extractPlaces,
} = require("../services/groqService");

const getPlaces = async (req, res) => {

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


        const places = await extractPlaces(
            itinerary.itinerary
        );

        res.json(places);

    } catch (error) {

        console.log("ERROR:");
        console.log(error);

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    getPlaces,
};