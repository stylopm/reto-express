const Package = require("../models/PackageSchema");
const { respApi, msgFormatConst } = require('../helpers/helpers');
const axios = require('axios');
require('dotenv').config();


const updateAllPackages = async () => {
  let packageList = await Package.find({});
  packageList.map(
    async (data) => {
      await axios.get(process.env.URLAPI + "/" + data.shipping_id, {
        headers: {
          'Authorization': process.env.KEYAPI
        }
      })
        .then(async (res) => {
          data.status = res.data.Status
          data.updatedate =  new Date();
          await Package.findByIdAndUpdate(data.id, data, {
            new: true,
          });
          return res
        })
        .catch((error) => {
          console.log('\x1b[31m ******************************************* \x1b[0m');
          console.log(
            `\x1b[31m **  Error  ** \x1b[0m`
          );
          console.error(error)
          console.log('\x1b[31m ******************************************* \x1b[0m');
        })
    }
  )
  console.log('\x1b[32m ************************************************ \x1b[0m');
  console.log(
    `\x1b[32m **  Se actualizan los registros exitosamente  ** \x1b[0m`
  );
  console.log('\x1b[32m ************************************************ \x1b[0m');
}



// localhost:5000/Package
const getPackage = async (req, res) => {
  try {
    let packageListUpdate = await Package.find({});
    respApi(res, "Success", packageListUpdate);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error al obtener los datos",
    });
  }
};

// localhost:5000/Package
const createPackage = async (req, res) => {
  try {
    msgFormatConst("Creación de paguetes");
    const result = await Package.create(req.body);
    respApi(res, "Success", result);
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
  updateAllPackages
};
