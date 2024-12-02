const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../db/connection");
const Book = require("../books/book.model");

const Order = sequelize.define('Order', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Define address fields separately
    addressCity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    addressCountry: {
        type: DataTypes.STRING,
    },
    addressState: {
        type: DataTypes.STRING,
    },
    addressZipcode: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
});

// Define the relationship
Order.belongsToMany(Book, { through: 'OrderBooks' });
Book.belongsToMany(Order, { through: 'OrderBooks' });

module.exports = Order;

