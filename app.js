//request and initiate express
const express = require("express");
const app = express();

//mongoose to be able to connect to database
const mongoose = require("mongoose");

//initialize routes
require("./routes/new.js")(app);
require("./routes/showAll.js")(app);
require("./routes/showOlder.js")(app);
require("./routes/delete.js")(app);
require("./routes/update.js")(app);
require("./routes/updateByOwner.js")(app);

//connection URI
const URI =
  "mongodb+srv://Lerato29:lerato@lerato.rro7a.mongodb.net/cars?retryWrites=true&w=majority";

//connecting to database
mongoose.connect(
  URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Success! Connected to mongoDB...");
  }
);

//PORT for server to listen on
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
