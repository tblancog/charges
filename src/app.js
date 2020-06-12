const express = require("express");
const app = express();

/**
 * Services
 */
const EventService = require("./services/event");

/**
 * Routes
 */
// Init middleware
app.use(express.json({ extended: false }));

// Sanity test
app.get("/sanity", async (req, res) => {
  res.json({ message: "pass!" });
});

/**
 * Get events
 */
app.get("/events", async (req, res, next) => {
  try {
    const events = await EventService.listEvents();
    res.json(events);
  } catch (e) {
    next(e);
  }
});

/**
 * Post events
 */
app.post("/events", async (req, res, next) => {
  const { name, createdAt } = req.body;
  try {
    const event = await EventService.createEvent(name, createdAt);
    res.json(event);
  } catch (e) {
    next(e);
  }
});

module.exports = app;
