# Travel AI Itinerary Generator

A MERN Stack application that allows users to upload travel booking documents (PDFs or Images) and automatically generates AI-powered travel itineraries.

## Features

* JWT Authentication (Login/Register)
* PDF Upload Support
* Image Upload Support (OCR)
* AI-Powered Itinerary Generation
* MongoDB Storage
* Travel History
* Copy Itinerary
* WhatsApp Sharing
* Responsive Dashboard UI

## Tech Stack

### Frontend

* React.js
* React Router
* Bootstrap
* React Toastify
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Multer
* PDF Parse
* Tesseract OCR
* Groq AI (Llama 3.3)

## Installation

### Backend

```bash
cd Server
npm install
npm run dev
```

### Frontend

```bash
cd Client/vite-project
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the Server folder:

```env
PORT=5000
MONGO_URI=YOUR_MONGO_URI
JWT_SECRET=YOUR_SECRET
GROQ_API_KEY=YOUR_GROQ_KEY
```

## Project Features

* Upload travel booking PDFs
* Upload travel booking images
* Extract booking details automatically
* Generate structured itineraries using AI
* Save itineraries in MongoDB
* View itinerary history
* Share itineraries via WhatsApp
* Copy itineraries to clipboard

```
```
