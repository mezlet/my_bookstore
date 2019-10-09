'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    book_id: DataTypes.INTEGER

  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};