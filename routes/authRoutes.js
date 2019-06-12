var router = require("express").Router();
var db = require("../models");

module.exports = function (passport) {
  router.get("/whodis", function (req, res) {
    res.render("auth");
  });
  router.post(
    "/whodis",
    passport.authenticate("local"), //this is the magic
    function (req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      //res.sendFile()
      console.log("Authenticated.");
      res.json({ success: true });
    }
  );

  //   router.post("/whodis", function(req, res) {
  //     passport.authenticate("local", function(err, user, info) {
  //       if (err) {
  //         return res.json(err);
  //       }
  //       if (!user) {
  //         console.log(info.message);
  //         return res.json(info);
  //       } else {
  //         return res.json({ message: "Success" });
  //       }
  //     })(req, res);
  //   });

  // Create a new Instructor
  router.post("/signup", function (req, res) {
    // grab the data out of req.body
    let { firstName, lastName, email, phone, password } = req.body;
    // create a new user
    db.User.create({ email, password, isInstructor: true }).then(function (user) {
      let id = user.id;
      db.Instructor.create({ firstName, lastName, email, phone, password, UserId: id }).then(function (instructor) {
        res.json(instructor);
      });
    });
  });

  router.post(
    "/logout",

    function (req, res) {
      req.logout();

      res.json({
        success: req.user ? "No" : "Yes",
        user: req.user
      });
    }
  );

  return router;
};
