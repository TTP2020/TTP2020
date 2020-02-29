const Sequelize = require('sequelize');
const db = require('../index');

const Resume = db.define('resume', {
  file: {
    type: Sequelize.BLOB,
  },
});

module.exports = Resume;
