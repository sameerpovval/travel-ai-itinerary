const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const generateItinerary = async (travelData) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const prompt = `
  Create a detailed travel itinerary.

  Travel Details:
${JSON.stringify(travelData, null, 2)}

  Give:
  - Day wise plan
  - Places to visit
  - Food recommendations
  - Travel tips

  Format nicely.
  `;

    const result = await model.generateContent(prompt);

    return result.response.text();
};

module.exports = generateItinerary;