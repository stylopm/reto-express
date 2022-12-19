const User = require("../models/userShema");

// localhost:5000/users
const getUsers = async (req, res) => {
  try {
    msgFormatCons("Lista de usuarios");
    const users = await User.find({});
    respApi(res, "Success", users);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
};

// localhost:5000/users
const createUser = async (req, res) => {
  try {
    msgFormatCons("Creación de usuario");
    db.users.push(req.body);
    const user = await User.create(req.body);
    respApi(res, "Success", user);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
};

// localhost:5000/users/1
const updateUser = async (req, res) => {
  try {
    console.log(req.params.id);
    msgFormatCons("Actualización de usuario");
    const newUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    respApi(res, "Success", newUpdate);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al actualizar el usuario",
    });
  }
};

// localhost:5000/users/1
const deleteUser = async (req, res) => {
  try {
    console.log(req.params.id);
    msgFormatCons("Eliminar usuario");
    const newUpdate = await User.findByIdAndRemove({ _id: req.params.id });
    respApi(res, "Success", newUpdate);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al actualizar el usuario",
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
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
