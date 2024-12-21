const express = require("express");
const app = express();
const db = require("./db.js");
require("dotenv").config()
const Person = require("./models/Person.js");
const MenuItem = require("./models/MenuItem.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json()); //req.body

// app.get("/person", (req, res) => {
//   res.send("Welcome To My Coding Plateform");
// });


// Import the router files
const personRoutes = require("./routes/personRoutes.js")
const menuRoutes = require("./routes/menuRoutes.js")

app.use("/person",personRoutes)
app.use("/menu",menuRoutes)


// const PORT = 3000;
const PORT = process.env.PORT || 3000;

//commit added successfully

app.listen(PORT, () => {
  console.log(`Server is Running on PORT is ${PORT}`);
});
