const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  const cohorts = [{
    "_id": 1,
    "inProgress": false,
    "cohortSlug": "ft-wd-paris-2023-07-03",
    "cohortName": "FT WD PARIS 2023 07",
    "program": "Web Dev",
    "campus": "Paris",
    "startDate": "2023-07-03T00:00:00.000Z",
    "endDate": "2023-09-08T00:00:00.000Z",
    "programManager": "Sally Daher",
    "leadTeacher": "Florian Aube",
    "totalHours": 360
  },
    {
      "_id": 2,
      "cohortSlug": "pt-ux-berlin-2023-02-06",
      "cohortName": "PT UX BERLIN 2023 02",
      "program": "UX/UI",
      "format": "Part Time",
      "campus": "BERLIN",
      "startDate": "2023-02-06T00:00:00.000Z",
      "endDate": "2023-08-06T00:00:00.000Z",
      "inProgress": false,
      "programManager": "Alice Williams",
      "leadTeacher": "Bob Johnson",
      "totalHours": 360
    },
    {
    "_id": 3,
    "cohortSlug": "ft-da-miami-2023-03-06",
    "cohortName": "FT DA MIAMI 2023 03",
    "program": "Data Analytics",
    "format": "Full Time",
    "campus": "Miami",
    "startDate": "2023-03-06T00:00:00.000Z",
    "endDate": "2023-05-15T00:00:00.000Z",
    "inProgress": true,
    "programManager": "Charlie Brown",
    "leadTeacher": "Eva Edwards",
    "totalHours": 360
  },
  {
    "_id": 4,
    "cohortSlug": "pt-cy-paris-2023-04-03",
    "cohortName": "PT CY PARIS 2023 04",
    "program": "Cybersecurity",
    "format": "Part Time",
    "campus": "Paris",
    "startDate": "2023-04-03T00:00:00.000Z",
    "endDate": "2023-10-03T00:00:00.000Z",
    "inProgress": false,
    "programManager": "Eva Edwards",
    "leadTeacher": "Frank Foster",
    "totalHours": 360
  }
  ];
  res.json(cohorts);
});

app.get("/api/students", (req, res) => {
  const students = [{

    "_id": 1,
    "firstName": "Christine",
    "lastName": "Clayton",
    "email": "christine.clayton@example.com",
    "phone": "567-890-1234",
    "linkedinUrl": "https://linkedin.com/in/christineclaytonexample",
    "languages": ["English", "Dutch"],
    "program": "Web Dev",
    "background": "Computer Engineering",
    "image": "https://i.imgur.com/r8bo8u7.png",
    "cohort": 1,
    "projects": []
  },
  {
    "_id": 2,
    "firstName": "Grace",
    "lastName": "Green",
    "email": "grace.green@example.com",
    "phone": "901-234-5678",
    "linkedinUrl": "https://linkedin.com/in/gracegreenexample",
    "languages": ["English", "Portuguese"],
    "program": "Web Dev",
    "background": "Software Development",
    "image": "https://i.imgur.com/r8bo8u7.png",
    "cohort": 1,
    "projects": []
  },
  {
    "_id": 3,
    "firstName": "Jack",
    "lastName": "Johnson",
    "email": "jack.johnson@example.com",
    "phone": "234-567-8901",
    "linkedinUrl": "https://linkedin.com/in/jackjohnsonexample",
    "languages": ["English", "French"],
    "program": "Web Dev",
    "background": "System Administration",
    "image": "https://i.imgur.com/r8bo8u7.png",
    "cohort": 1,
    "projects": []
  },
  {
    "_id": 4,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "linkedinUrl": "https://linkedin.com/in/johndoeexample",
    "languages": ["English", "Spanish"],
    "program": "UX/UI",
    "background": "Computer Science",
    "image": "https://i.imgur.com/r8bo8u7.png",
    "cohort": 2,
    "projects": []
  },
  {
    "_id": 5,
    "firstName": "Katie",
    "lastName": "King",
    "email": "katie.king@example.com",
    "phone": "345-678-9012",
    "linkedinUrl": "https://linkedin.com/in/katiekingexample",
    "languages": ["English", "German"],
    "program": "UX/UI",
    "background": "Information Systems",
    "image": "https://i.imgur.com/r8bo8u7.png",
    "cohort": 2,
    "projects": []
  },
  {
    "_id": 6,
    "firstName": "Irene",
    "lastName": "Iverson",
    "email": "irene.iverson@example.com",
    "phone": "123-456-7890",
    "linkedinUrl": "https://linkedin.com/in/ireneiversonexample",
    "languages": ["English", "Spanish"],
    "program": "Data Analytics",
    "background": "Economics",
    "image": "https://i.imgur.com/r8bo8u7.png",
    "cohort": 3,
    "projects": []
  }
  ];
  res.json(students);
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});