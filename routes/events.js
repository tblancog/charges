const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

/**
 * @route POST api/events
 * @desc Create an event
 * @access Private
 */
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const event = new Event({
      name,
    });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @route GET api/events
 * @desc Get all events event
 * @access Private
 */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort("-createdAt");
    res.json(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
