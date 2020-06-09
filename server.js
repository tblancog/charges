const express = require("express");

const app = express();

// Init middleware
app.use(express.json({ extended: false }));

module.exports = app;
