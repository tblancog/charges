const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to mongo
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
module.exports = app;
