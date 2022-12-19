require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("\x1b[32m ******************************* \x1b[0m");
    console.log("\x1b[32m ** Conexión exitosa a la BD! ** \x1b[0m");
    console.log("\x1b[32m ******************************* \x1b[0m");
  } catch (e) {
    console.log("\x1b[31m *********************** \x1b[0m");
    console.log("\x1b[31m **  Error conexión ** \x1b[0m");
    console.log("\x1b[31m *********************** \x1b[0m");
  }
};

module.exports = { dbConnection };
