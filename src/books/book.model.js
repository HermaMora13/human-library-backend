const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); // Sequelize connection instance

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    coverImage: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
}, {
    timestamps: true,
});

module.exports = Book;
