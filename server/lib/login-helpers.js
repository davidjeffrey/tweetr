"use strict";

module.exports = function checkForUser(db) {
  return {
    // input user name request and compare to users in db
    checkLogin: function(user, callback) {
      db.collection("tweets").findOne({"user.handle": user.username, "user.password": user.password}, function(err, r) {
        if (err) {
          return callback(err);
        }
        callback(null, r);
      });
    },
    createUser: function(user, callback) {
      db.collection("tweets").insertOne(user, function(err, response) {
      callback(null, true);
      })
    }
  };
}