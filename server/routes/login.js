"use strict";

const userHelper    = require("../lib/util/user-helper")
const express       = require('express');
const loginRoutes   = express.Router();
const app           = express();

const cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session',
  keys: ["dougie"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

module.exports = function(checkForUser) {

  loginRoutes.post("/", function(req, res) {
    console.log(req.body)
    if (req.body.username) {
      checkForUser.checkLogin(req.body, (err, r) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (r === null) {
          res.status(401).send();
        }
        else {
          console.log("login")
          req.session.user_id = req.body.username;
          res.status(201).send();
        }
      });
    } else {

      let newGuy = {
      user: {
        name: req.body.realName,
        password: req.body.newPassword,
        handle: req.body.newUserName,
        avatars: {small: req.body.newAvatar}
      }
      }
      checkForUser.createUser(newGuy, (err, response) => {
        if (err) {
        res.status(500).json({ error: err.message });
        } else {
          console.log("register")
          req.session.user_id = req.body.newUserName;
          res.status(201).send();
        }
      });
    }

  });
  return loginRoutes;
}