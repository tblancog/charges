const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["ACTIVO", "SOLVENTE", "MOROSO"] },
});
mongoose.set("useCreateIndex", true);
module.exports = mongoose.model("User", UserSchema);
