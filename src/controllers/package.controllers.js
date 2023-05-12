const Package = require("../models/PackageSchema");
const { respApi, msgFormatConst } = require('../helpers/helpers');
const User = require("../models/UserSchema");

// localhost:5000/Package
const getPackage = async (req, res) => {
  try {
    msgFormatConst("Lista de paguetes");
    const Package = await Package.find({});
    respApi(res, "Success", Package);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
};

// localhost:5000/Package
const createPackage = async (req, res) => {
  try {
    msgFormatConst("Creación de paguetes");
    const Package = await Package.create(req.body);
    respApi(res, "Success", Package);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
};

// localhost:5000/Package/1
const updatePackage = async (req, res) => {
  try {
    msgFormatConst("Actualización de paquete");
    const newUpdate = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    respApi(res, "Success", newUpdate);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al actualizar el paquete",
    });
  }
};

// localhost:5000/Package/1
const deletePackage = async (req, res) => {
  try {
    msgFormatConst("Eliminar paquete");
    const newUpdate = await Package.findByIdAndRemove({ _id: req.params.id });
    respApi(res, "Success", newUpdate);
  } catch {
    res.status(500).json({
      msg: "Hubo un error al actualizar el paquete",
    });
  }
};

module.exports = {
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
};
