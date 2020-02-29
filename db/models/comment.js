const Sequelize = require('sequelize');
const db = require('../index');

const Comment = db.define('comment', {
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  documentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Comment;
