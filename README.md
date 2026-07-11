# ✈️ Travel AI Itinerary Generator

An AI-powered travel planner built with the MERN Stack. Users can upload travel tickets (PDF or Image), automatically generate a complete travel itinerary using AI, chat with an AI travel assistant, manage saved trips, and share or export itineraries.

---

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Protected Routes

### 📄 Document Upload
- Upload Travel Tickets (PDF)
- Upload Travel Tickets (JPG, PNG)
- OCR Text Extraction using Tesseract
- PDF Text Extraction

### 🤖 AI Features
- AI Travel Itinerary Generation
- AI Travel Assistant Chat
- AI Budget Estimation
- AI Place Recommendations

### 🧳 Trip Management
- Save Itineraries
- View History
- Rename Trips
- Delete Trips
- Search Trips
- View Single Itinerary

### 💬 Chat System
- Chat history stored in MongoDB
- Continue previous AI conversations
- Context-aware travel assistant

### 📤 Sharing
- Copy Itinerary
- Share via WhatsApp
- Download as PDF

### 🎨 UI
- Responsive Design
- Bootstrap 5
- Toast Notifications
- SweetAlert2
- Modern Dashboard

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap 5
- React Toastify
- SweetAlert2
- html2pdf.js

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer
- pdf-parse
- Tesseract OCR
- Groq AI (Llama 3.3)

---

# 📂 Project Structure

```
Client/
    src/
        components/
        pages/
        services/
        styles/

Server/
    controllers/
    middleware/
    models/
    routes/
    services/
```

---

# ⚙️ Installation

## Backend

```bash
cd Server
npm install
npm run dev
```

## Frontend

```bash
cd Client/vite-project
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **Server** folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

# 📸 Main Features

- Upload PDF or Image Ticket
- OCR Text Extraction
- AI Generated Travel Itinerary
- AI Travel Assistant
- AI Budget Estimator
- AI Suggested Places
- Rename Trips
- Delete Trips
- Search Trips
- Download PDF
- WhatsApp Sharing
- Copy Itinerary
- Persistent Chat History
- Responsive UI

---

# 📌 Future Improvements

- Weather Forecast
- Flight Price Estimation
- Hotel Recommendations
- Multi-language Support
- Email Sharing
- Dark Mode

---

# 👨‍💻 Author

**Sameer Povval**

MERN Stack Developer