const Tesseract = require("tesseract.js");

const extractImageText = async (
imagePath
) => {
const result =
await Tesseract.recognize(
imagePath,
"eng"
);

return result.data.text;
};

module.exports = extractImageText;
