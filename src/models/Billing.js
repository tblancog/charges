const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  event_id: { type: String, unique: true, required: true },
  amount: { type: Number, default: 0.0 },
  currency: { type: String, default: "ARS" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event_type: {
    type: String,
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
    required: true,
  },
  date: { type: Date, default: Date.now },
});
mongoose.set("useCreateIndex", true);
module.exports = mongoose.model("Event", EventSchema);
