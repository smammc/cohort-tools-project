const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");
const students = require("./models/Student.model");
const cohorts = require("./models/Cohort.model");
const cors = require("cors");
mongoose
  .connect("mongodb://127.0.0.1:27017/cohorts-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res, next) => {
  res.sendFile(__dirname + "/views/docs.html");
});
app.get("/students", (req, res) => {
  students
    .find({})
    .then((student) => {
      console.log("Retrieved student ->", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).json({ error: "Failed to retrieve student" });
    });
});

app.post("/api/students", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    img,
    projects,
    cohort,
  } = req.body;

  students
    .create({
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      img,
      projects,
      cohort,
    })
    .then((student) => {
      console.log("Student created: ", student);
      res.status(201).json(student);
    })
    .catch((err) => {
      console.log("Error creating a student:", err);
      res.status(500).json(err);
    });
});

app.get("/api/students", (req, res) => {
  students
    .find({})
    .populate("cohort")
    .then((student) => {
      console.log("Retrieved student ->", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).json({ error: "Failed to retrieve student" });
    });
});

app.get("/api/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  students
    .findById(cohortId)
    .populate("cohort")
    .then((cohortId) => {
      res.status(200).json(cohortId);
    })
    .catch((err) => {
      console.log("Error getting student:", err);
      res.status(500).json(err);
    });
});

app.get("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  students
    .findById(studentId)
    .populate("cohort")
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((err) => {
      console.log("Error getting student:", err);
      res.status(500).json(err);
    });
});

app.put("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    img,
    projects,
    cohort,
  } = req.body;

  students
    .findByIdAndUpdate(
      studentId,
      {
        firstName,
        lastName,
        email,
        phone,
        linkedinUrl,
        languages,
        program,
        background,
        img,
        projects,
        cohort,
      },
      { new: true }
    )
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((err) => {
      console.log("Error updating student:", err);
      res.status(500).json(err);
    });
});

app.delete("/api/students/:studentId", (req, res) => {
  const { studentId } = req.params;

  students
    .findByIdAndDelete(studentId)
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((err) => {
      console.log("Error deleting student:", err);
      res.status(500).json(err);
    });
});

app.get("/cohorts", (req, res, next) => {
  cohorts
    .find({})
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching cohorts" });
    });
});

app.post("/api/cohorts", (req, res) => {
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  cohorts
    .create({
      cohortSlug,
      cohortName,
      program,
      format,
      campus,
      startDate,
      endDate,
      inProgress,
      programManager,
      leadTeacher,
      totalHours,
    })
    .then((cohort) => {
      console.log("Cohort created: ", cohort);
      res.status(201).json(cohort);
    })
    .catch((err) => {
      console.log("Error creating a cohort:", err);
      res.status(500).json(err);
    });
});

app.get("/api/cohorts", (req, res) => {
  cohorts
    .find({})
    .then((cohort) => {
      console.log("Retrieved cohort ->", cohort);
      res.json(cohort);
    })
    .catch((error) => {
      console.error("Error while retrieving cohort ->", error);
      res.status(500).json({ error: "Failed to retrieve cohort" });
    });
});

app.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  cohorts
    .findById(id)
    .then((cohorts) => {
      res.status(200).json(cohorts);
    })
    .catch((err) => {
      console.log("Error getting cohort:", err);
      res.status(500).json(err);
    });
});

app.put("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  const {
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    inProgress,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  cohorts
    .findByIdAndUpdate(
      cohortId,
      {
        cohortSlug,
        cohortName,
        program,
        format,
        campus,
        startDate,
        endDate,
        inProgress,
        programManager,
        leadTeacher,
        totalHours,
      },
      { new: true }
    )
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((err) => {
      console.log("Error updating cohort:", err);
      res.status(500).json(err);
    });
});

app.delete("/api/cohorts/:cohortId", (req, res) => {
  const { cohortId } = req.params;

  cohorts
    .findByIdAndDelete(cohortId)
    .then((cohort) => {
      res.status(200).json(cohort);
    })
    .catch((err) => {
      console.log("Error deleting cohort:", err);
      res.status(500).json(err);
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
