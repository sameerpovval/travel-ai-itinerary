const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Generate Travel Itinerary
const generateItinerary = async (travelData) => {

    const completion = await groq.chat.completions.create({

        messages: [
            {
                role: "user",
                content: `
Create a detailed travel itinerary.

Travel Details:
${travelData}

Include:
- Day wise plan
- Places to visit
- Food recommendations
- Travel tips
`,
            },
        ],

        model: "llama-3.3-70b-versatile",
    });

    return completion.choices[0].message.content;
};


// AI Travel Assistant
const askTravelAssistant = async (
    itinerary,
    messages
) => {

    const chatMessages = [
        {
            role: "system",
            content:
                "You are a helpful AI Travel Assistant. Answer the user's question only using the provided itinerary. If the answer is not available, politely say so.",
        },

        {
            role: "system",
            content: `Travel Itinerary:

${itinerary}`,
        },

        ...messages.map((msg) => ({
            role: msg.role,
            content: msg.text,
        })),
    ];

    const completion =
        await groq.chat.completions.create({

            messages: chatMessages,

            model: "llama-3.3-70b-versatile",
        });

    return completion.choices[0].message.content;
};

module.exports = {
    generateItinerary,
    askTravelAssistant,
};