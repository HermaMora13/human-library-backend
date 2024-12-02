const Order = require("./order.model");
const Book = require("../books/book.model");

const createAOrder = async (req, res) => {
  try {
      const { name, email, addressCity, addressCountry, addressState, addressZipcode, phone, productIds } = req.body;
      console.log("1/----------------------------------------------------")
      console.log(req.body);
      console.log("----------------------------------------------------")
      // Создание заказа
      const newOrder = await Order.create({
          name,
          email,
          addressCity,
          addressCountry,
          addressState,
          addressZipcode,
          phone
          
      });
      console.log("4/----------------------------------------------------")
      console.log(newOrder);
      console.log("----------------------------------------------------")
      // Добавление связанных книг
      if (productIds && productIds.length > 0) {
          const books = await Book.findAll({
              where: {
                  id: productIds,
              },
          });
          await newOrder.addBooks(books);
      }

      // Загрузка связанных книг
      const orderWithBooks = await Order.findByPk(newOrder.id, {
          include: {
              model: Book,
              attributes: ['id'], // Включаем только ID книг
              through: { attributes: [] }, // Исключаем данные промежуточной таблицы
          },
      });
      console.log("2/----------------------------------------------------")
      console.log(orderWithBooks);
      console.log("----------------------------------------------------")
      // Возвращаем заказ вместе с productIds
      res.status(201).json({
          ...orderWithBooks.toJSON(),
          productIds: orderWithBooks.Books.map((book) => book.id),
      });
  } catch (error) {
      console.error("Error creating order", error);
      res.status(500).json({ message: "Failed to create order" });
  }
};


const getOrderByEmail = async (req, res) => {
  try {
      const { email } = req.params;

      // Поиск заказов с включением связанных книг
      const orders = await Order.findAll({
          where: { email },
          include: {
              model: Book,
              attributes: ['id'], // Включаем только ID книг
              through: { attributes: [] },
          },
          order: [['createdAt', 'DESC']],
      });

      if (!orders.length) {
          return res.status(404).json({ message: "Orders not found" });
      }

      // Формируем ответ с productIds
      const ordersWithProductIds = orders.map((order) => ({
          ...order.toJSON(),
          productIds: order.Books.map((book) => book.id),
      }));
      console.log("3/----------------------------------------------------")
      console.log(ordersWithProductIds)
      console.log("----------------------------------------------------")
      res.status(200).json(ordersWithProductIds);
  } catch (error) {
      console.error("Error fetching orders", error);
      res.status(500).json({ message: "Failed to fetch orders" });
  }
};


module.exports = {
  createAOrder,
  getOrderByEmail
};
