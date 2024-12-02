const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require("../db/connection");

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
    },
});

module.exports = User;
