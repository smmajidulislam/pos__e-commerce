const mongoose = require("mongoose");
const config = require("../config/config");

const dbConnect = () => {
  try {
    mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
