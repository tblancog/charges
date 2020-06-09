const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to mongo
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Routes
// Events
app.use("/events", require("./routes/events"));

module.exports = app;
