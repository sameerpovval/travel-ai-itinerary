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

// Extract Places From Itinerary
const extractPlaces = async (itinerary) => {

    const completion = await groq.chat.completions.create({

        messages: [
            {
                role: "system",
                content: `
You are a travel assistant.

Extract only the tourist places, attractions, landmarks and restaurants.

Return ONLY a JSON array.

Example:

[
  "Gateway of India Mumbai",
  "Marine Drive Mumbai",
  "Leopold Cafe Mumbai"
]

Do not explain anything.
`,
            },

            {
                role: "user",
                content: itinerary,
            },
        ],

        model: "llama-3.3-70b-versatile",
    });

    return JSON.parse(
        completion.choices[0].message.content
    );
};

const estimateBudget = async (itinerary) => {

    const completion = await groq.chat.completions.create({

        messages: [
            {
                role: "user",
                content: `
Based on this travel itinerary, estimate the travel budget in Indian Rupees.

Travel Itinerary:

${itinerary}

Include:

- Hotel
- Food
- Local Transport
- Sightseeing
- Shopping
- Miscellaneous
- Total Estimated Budget

Format the response clearly using headings and bullet points.
`,
            },
        ],

        model: "llama-3.3-70b-versatile",
    });

    return completion.choices[0].message.content;
};

module.exports = {
    generateItinerary,
    askTravelAssistant,
    extractPlaces,
    estimateBudget,
};