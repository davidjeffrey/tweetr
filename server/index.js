"use strict";
const bcrypt        = require('bcrypt');
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb");
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";
const cookieSession = require('cookie-session')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.use(cookieSession({
  name: 'session',
  keys: ["dougie"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  const checkForUser = require("./lib/login-helpers.js")(db);

  const login = require("./routes/login")(checkForUser);

  app.use("/tweets", tweetsRoutes);

  app.use("/login", login);

  app.listen(PORT, () => {
    console.log("tweetr listening on port " + PORT);
  });

});
