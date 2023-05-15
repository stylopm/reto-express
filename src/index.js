require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { dbConnection } = require('./config/db');
const app = express();
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

app.use('/users', require('./routes/users.routes'));
app.use('/packages', require('./routes/packages.routes'));
