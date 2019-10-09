'use strict';
import { hashPassword } from '../utils/helpers';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    hash: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

  Users.beforeCreate(user => {
    if (user.changed('hash')) {
      user.hash = hashPassword(user.get('hash'));
    }
  });

  Users.beforeUpdate(user => {
    if (user.changed('hash')) {
      user.hash = hashPassword(user.get('hash'));
    }
  });

  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};