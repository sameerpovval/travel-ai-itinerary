const Itinerary = require("../models/Itinerary");

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

        res.json(itinerary.places);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    getPlaces,
};