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
    respApi,
    msgFormatCons
  };
  