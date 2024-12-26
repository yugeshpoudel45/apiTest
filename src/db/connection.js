const mongoose = require("mongoose");

async function connectMongoDb(url) {
  try {
    //!-------------------------Database Connection-----------------
    await mongoose.connect(url);
    console.log("Connected to the database successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

module.exports = connectMongoDb;
