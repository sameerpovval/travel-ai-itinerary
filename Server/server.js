require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const chatRoutes = require('./routes/chatRoutes')
const placeRoutes = require('./routes/placeRoutes')
const budgetRoutes = require('./routes/budgetRoutes')
const profileRoutes = require("./routes/profileRoutes");


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/", (req, res) => {
    res.send("Travel AI API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/chat", chatRoutes)
app.use('/api/places', placeRoutes)
app.use('/api/budget', budgetRoutes)
app.use("/api/profile", profileRoutes);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});