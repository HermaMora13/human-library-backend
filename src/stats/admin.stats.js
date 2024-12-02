const express = require('express');
const Order = require('../orders/order.model');
const Book = require('../books/book.model');
const router = express.Router();
const sequelize = require('../db/connection');

// Function to calculate admin stats
router.get("/", async (req, res) => {
    try {
        // 1. Total number of orders
        const totalOrders = await Order.count();

        
        

        // 3. Trending books statistics
        const trendingBooksCount = await Book.count({ where: { trending: true } });

        // 4. Total number of books
        const totalBooks = await Book.count();

        // 5. Monthly sales (group by month and sum total sales for each month)
        

        // Result summary
        res.status(200).json({
            totalOrders,
            
            trendingBooks: trendingBooksCount,
            totalBooks
            
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
});

module.exports = router;
