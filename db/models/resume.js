const Sequelize = require("sequelize");
const db = require("../index");

const Resume = db.define("resume", {
  file: {
    type: Sequelize.BLOB,
    allowNullL: false
  }
});

module.exports = Resume;
