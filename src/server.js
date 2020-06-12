const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/charges_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = require("./app");
const port = 3000;

app.listen(port);
