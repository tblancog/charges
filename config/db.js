const mongoose = require("mongoose");
const config = require("config");
const uri = config.get("mongoURI");

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log("MongoDB connected!");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connect;
