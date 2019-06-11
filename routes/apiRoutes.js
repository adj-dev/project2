var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Get all instructor data
  app.get("/api/instructor/:id", function(req, res) {
    let condition = {
      include: [{ model: db.Student, include: db.Lesson }],
      where: { id: req.params.id }
    };

    db.Instructor.findOne(condition).then(function(instructor) {
      res.json(instructor);
    });
  });

  // Get all student data
  app.get("/api/student/:id", function(req, res) {
    let condition = { include: [db.Lesson], where: { id: req.params.id } };

    db.Student.findOne(condition).then(function(student) {
      res.json(student);
    });
  });

  // Create a new Instructor
  app.post("/api/instructor", function(req, res) {
    console.log(req.body);
    db.Instructor.create(req.body).then(function(instructor) {
      res.json(instructor);
    });
  });

  // Create a new Student
  app.post("/api/student", function(req, res) {
    console.log(req.body);
    db.Student.create(req.body).then(function(student) {
      res.json(student);
    });
  });

  // Create a new Lesson
  app.post("/api/lesson", function(req, res) {
    console.log(req.body);
    db.Lesson.create(req.body).then(function(lesson) {
      res.json(lesson);
    });
  });

  app.post("/new_instructor", function(req, res) {
    db.Instructor.create({
      firstName: "Susy",
      lastName: "Queww",
      email: "foo@bar.com",
      phone: "5554441234",
      password: "1234"
    }).then(result => {
      res.json(result);
    });
  });

  app.post("/new_student", function(req, res) {
    db.Student.create({
      firstName: "Ben",
      lastName: "Shrewd",
      email: "foo@bark.com",
      password: "1234",
      phone: "5554431234",
      notes: "This guy really is nuts...",
      InstructorId: 1
    }).then(result => {
      res.json(result);
    });
  });

  // Edit an Instructor
  app.put("/api/instructor/:id", function(req, res) {
    let { id } = req.params;
    console.log(req.body);
    let condition = { where: { id: id } };
    db.Instructor.update(req.body, condition).then(function(instructor) {
      res.json(instructor);
    });
  });
  // Edit a Student
  app.put("/api/student/:id", function(req, res) {
    let { id } = req.params;
    console.log(req.body);
    let condition = { where: { id: id } };
    db.Student.update(req.body, condition).then(function(student) {
      res.json(student);
    });
  });
  // Edit a Lesson
  app.put("/api/lesson/:id", function(req, res) {
    let { id } = req.params;
    console.log(req.body);
    let condition = { where: { id: id } };
    db.Lesson.update(req.body, condition).then(function(lesson) {
      res.json(lesson);
    });
  });

  // Delete an example by id
  app.delete("/api/instructor/:id", function(req, res) {
    db.Instructor.destroy({ where: { id: req.params.id } }).then(function(
      instructor
    ) {
      res.json(instructor);
    });
  });

  // Delete an example by id
  app.delete("/api/student/:id", function(req, res) {
    db.Student.destroy({ where: { id: req.params.id } }).then(function(
      student
    ) {
      res.json(student);
    });
  });

  // Delete an example by id
  app.delete("/api/lesson/:id", function(req, res) {
    db.Lesson.destroy({ where: { id: req.params.id } }).then(function(lesson) {
      res.json(lesson);
    });
  });
};
