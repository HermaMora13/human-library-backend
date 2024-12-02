const express = require("express");
const app = express();
const cors = require("cors");

const sequelize = require("./src/db/connection");
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://human-library.vercel.app'],
    credentials: true,
}));

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes =  require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully!');

    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully!');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to sync Sequelize with PostgreSQL:', err);
  }
}

main();
