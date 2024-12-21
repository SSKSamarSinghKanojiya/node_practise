const mongoose = require("mongoose");
require("dotenv").config()

const mongoURL = process.env.DB_URL;
// const mongoURL = "mongodb://localhost:27017/pricenodejs";

// mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(mongoURL);


const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db.on("error", (err) => {
  console.log("MongoDB Connection Error ", err);
});

db.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});


module.exports = db;