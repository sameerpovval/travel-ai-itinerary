require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const chatRoutes = require('./routes/chatRoutes')
const placeRoutes = require('./routes/placeRoutes')
const budgetRoutes = require('./routes/budgetRoutes')

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Travel AI API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/chat",chatRoutes)
app.use('/api/places',placeRoutes)
app.use('/api/budget',budgetRoutes)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
});