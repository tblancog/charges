const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  event: { type: mongoose.Schema.ObjectId, ref: "Event", required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "ARS", enum: ["ARS", "USD"] },
  date: { type: Date, default: Date.now },
});
mongoose.set("useCreateIndex", true);
module.exports = mongoose.model("Payment", PaymentSchema);
