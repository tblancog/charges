const express = require("express");
const app = express();

/**
 * Services
 */
const EventService = require("./services/event");
const UserService = require("./services/user");

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
  try {
    const event = await EventService.createEvent(req.body);
    res.json(event);
  } catch (e) {
    next(e);
  }
});

/**
 * Get users
 */
app.get("/users", async (req, res, next) => {
  try {
    const users = await UserService.listUsers();
    res.json(users);
  } catch (e) {
    next();
  }
});

/**
 * Get user by id
 */
app.get("/users/:id", async (req, res, next) => {
  try {
    res.json(await UserService.getUserById(req.params.id));
  } catch (e) {
    next();
  }
});

/**
 * Post users
 */
app.post("/users", async (req, res, next) => {
  const { name, status } = req.body;
  try {
    const event = await UserService.createUser(name, status);
    res.json(event);
  } catch (e) {
    next(e);
  }
});
module.exports = app;
