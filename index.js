const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// app.use(bodyParser.json()) 



require('dotenv').config();
require('./utils/dbmongocon');

//Middlewares
app.use(cors());

// Port 
const port = 5000;

// para traernos datos de objetos de un formulario,permite procesarlo y crear el objeto.Extended, no acepta datos como imagen
app.use(cookieParser()); //Permite trabajar con cookies

//Conexion server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// Routes 
app.use(require('./routes/routesUser'));

