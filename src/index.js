require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { dbConnection } = require('./config/db');
const cron = require("node-cron");
const app = express();
const { updateAllPackages } = require('./controllers/package.controllers');


// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
dbConnection();
// Levanto el servidor
app.listen(process.env.PORT, () => {
  console.log('\x1b[34m ******************************************* \x1b[0m');
  console.log(
    `\x1b[34m **  Se levanta la API en el puerto ${process.env.PORT}  ** \x1b[0m`
  );
  console.log('\x1b[34m ******************************************* \x1b[0m');
});

// localhost:5000
// localhost:5000/
app.get('/', (req, res) => {
  res.send('Se ha levantado con exitó la API');
});

cron.schedule(`*/${process.env.SECOND} * * * * *`, function () {
  var hoy = new Date();
  var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
  var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
  var fechaYHora = fecha + ' ' + hora;
  console.log("---------------------------------------------------------------");
  console.log(`running a task every ${process.env.SECOND} seconds ${fechaYHora}`  );
  console.log("---------------------------------------------------------------");
  updateAllPackages();
});


app.use('/users', require('./routes/users.routes'));
app.use('/packages', require('./routes/packages.routes'));
