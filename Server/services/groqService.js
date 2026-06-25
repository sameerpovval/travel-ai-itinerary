const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateItinerary = async (travelData) => {
  const completion =
    await groq.chat.completions.create({
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

module.exports = generateItinerary;