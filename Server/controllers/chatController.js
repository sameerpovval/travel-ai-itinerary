const Itinerary = require("../models/Itinerary");
const { askTravelAssistant } = require("../services/groqService");

const chatWithAI = async (req, res) => {
    try {

        const { itineraryId, question } = req.body;

        const itinerary = await Itinerary.findById(itineraryId);

        if (!itinerary) {
            return res.status(404).json({
                message: "Itinerary not found",
            });
        }

        itinerary.messages.push({
            role: "user",
            text: question,
        });

        const answer = await askTravelAssistant(
            itinerary.itinerary,
            itinerary.messages
        );

        itinerary.messages.push({
            role: "assistant",
            text: answer,
        });

        await itinerary.save();

        res.status(200).json({
            answer,
            messages: itinerary.messages,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    chatWithAI,
};