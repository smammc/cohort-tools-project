const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cohorts = require("./Cohort.model");

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  linkedinUrl: { type: String, default: "" },
  languages: [
    {
      type: String,
      enum: [
        "English",
        "Spanish",
        "French",
        "German",
        "Portuguese",
        "Dutch",
        "Other",
      ],
    },
  ],
  program: {
    type: String,
    enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  background: { type: String, default: "" },
  image: { type: String, Default: "https://i.imgur.com/r8bo8u7.png" },
  projects: Array,
  cohort: { type: mongoose.Schema.Types.ObjectId, ref: "cohorts" },
});
const students = mongoose.model("student", studentSchema);
// EXPORT THE MODEL
module.exports = students;
