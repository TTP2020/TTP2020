const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  documentId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Comment;
