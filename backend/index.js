const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Import authentication module
const auth = require('./router/auth');

const app = express();
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(express.json());

// Set up CORS middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials
    exposedHeaders: ['Set-Cookie'] // Expose Set-Cookie header
}));

// Handle CORS preflight requests
app.options('*', cors());

// Assuming auth module exports a function called Signup
app.use('/auth', auth);

app.listen(3000, () => {
    console.log("Listening on port: " + process.env.PORT);
});
