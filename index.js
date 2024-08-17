const express = require('express');
var cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');
//Crea el servidor de express
const app = express();

//Base de datos
dbConnection();

//Cors
app.use(cors());

//Dirctorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());
//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Escucha Peticiones
app.listen(process.env.PORT, () =>
  console.error(`Server listening on port ${process.env.PORT}!`)
);
