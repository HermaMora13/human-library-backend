const Book = require("./book.model");

// Создание книги
const postABook = async (req, res) => {
    try {
        const newBook = await Book.create(req.body); // Используем create вместо save
        res.status(201).send({ message: "Book posted successfully", book: newBook });
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({ message: "Failed to create book" });
    }
};

// Получение всех книг
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({ order: [['createdAt', 'DESC']] }); // Используем findAll с сортировкой
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed to fetch books" });
    }
};

// Получение одной книги
const getSingleBook = async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;
        const book = await Book.findByPk(id); // Используем findByPk вместо findById
        if (!book) {
            return res.status(404).send({ message: "Book not Found!" });
        }
        res.status(200).send(book);
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({ message: "Failed to fetch book" });
    }
};

// Обновление данных книги
const UpdateBook = async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;
        const [updated] = await Book.update(req.body, {
            where: { id },
            returning: true // Чтобы вернуть обновленную запись
        });
        if (!updated) {
            return res.status(404).send({ message: "Book is not Found!" });
        }
        const updatedBook = await Book.findByPk(id);
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({ message: "Failed to update a book" });
    }
};

// Удаление книги
const deleteABook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.destroy({ where: { id } }); // Используем destroy
        if (!deletedBook) {
            return res.status(404).send({ message: "Book is not Found!" });
        }
        res.status(200).send({
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({ message: "Failed to delete a book" });
    }
};

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
};
