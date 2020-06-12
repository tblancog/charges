const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  event_id: { type: String, unique: true },
  amount: { type: Number, default: 0.0 },
  currency: { type: String, default: "ARS" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  event_type: {
    enum: [
      "CLASIFICADO",
      "VENTA",
      "PUBLICIDAD",
      "ENVÍO",
      "CRÉDITO",
      "MERCADOPAGO",
      "MERCADOSHOP",
      "FIDELIDAD",
    ],
  },
  date: { type: Date, default: Date.now },
});
mongoose.set("useCreateIndex", true);
module.exports = mongoose.model("Event", eventSchema);
