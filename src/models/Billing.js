const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  amount: { type: Number, default: 0.0 },
  currency: { type: String, default: "ARS" },
  date: { type: Date, default: Date.now },
});
mongoose.set("useCreateIndex", true);
module.exports = mongoose.model("Billing", EventSchema);
