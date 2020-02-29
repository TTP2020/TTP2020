const Sequelize = require("sequelize");
const db = require("../index");

const Resume = db.define("resume", {
  fileName: {
    type: Sequelize.STRING,
    allowNullL: false
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: "Software Engineer"
  },
  type: {
    type: Sequelize.STRING,
    defaultValue: "resume"
  }
});

module.exports = Resume;
