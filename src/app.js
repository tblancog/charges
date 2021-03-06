const express = require("express");
const app = express();

/**
 * Services
 */
const EventService = require("./services/event");
const UserService = require("./services/user");
const BillingService = require("./services/billing");
const PaymentService = require("./services/payment");

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

// Get user billing by month/year
app.get("/users/:id/billing", async (req, res, next) => {
  try {
    let billing = await BillingService.getBilling(req.params.id);
    // transform to desired output
    billing = billing.map((bill) => {
      return {
        billing_date: `${bill._id.month}/${bill._id.year}`,
        charges: bill.docs,
      };
    });
    res.json(billing);
  } catch (e) {
    next(e);
  }
});

// Post payments
app.post("/payments", async (req, res, next) => {
  const { user, event, amount } = req.body;
  try {
    const response = await PaymentService.createPayment({
      user,
      event,
      amount,
    });
    res.json(response);
  } catch (e) {
    next(e);
  }
});

// Get Payments
app.get("/payments", async (req, res, next) => {
  try {
    const payments = await PaymentService.getPayments();
    res.json(payments);
  } catch (e) {
    next(e);
  }
});

// Get user Payments
app.get("/users/:id/payments", async (req, res, next) => {
  try {
    const payments = await PaymentService.getPayments(req.params.id);
    res.json(payments);
  } catch (e) {
    next(e);
  }
});

module.exports = app;
