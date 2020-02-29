const Sequelize = require('sequelize');
const db = require('../index');

const Comment = db.define('comment', {
  comment: {
    type: Sequelize.STRING,
    allowNull: false
  },
  x: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  y: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'white'
  },
  documentId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pageNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Comment;
