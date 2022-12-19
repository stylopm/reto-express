const Books = require("../models/bookSchema");

// localhost:5000/users
const getBooks = async (req, res) => {
  try {
    msgFormatCons("Lista de libros");
    const books = await Books.find({});
    respApi(res, "Success", books);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
};

// localhost:5000/books
const createBook = async (req, res) => {
  try {
    msgFormatCons("Creación de libros");
    const book = await Books.create(req.body);
    respApi(res, "Success", book);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
};

// localhost:5000/users/1
const updateBook = async (req, res) => {
  try {
    msgFormatCons("Actualización de libro");
    const newUpdate = await Books.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    respApi(res, "Success", newUpdate);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al actualizar el libro",
    });
  }
};

// localhost:5000/books/1
const deleteBook = async (req, res) => {
  try {
    msgFormatCons("Eliminar libro");
    const newUpdate = await Books.findByIdAndRemove({ _id: req.params.id });
    respApi(res, "Success", newUpdate);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al actualizar el libro",
    });
  }
};

// Funcion general para la parte de respuesta
const respApi = (res, msg, data) => {
  res.json({
    msg: msg,
    total: data.length,
    data: data,
  });
};

const msgFormatCons = (msj) => {
  console.log(`\x1b[33m ${msj}\x1b[0m`);
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
