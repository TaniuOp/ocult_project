const jwt = require('jsonwebtoken'); 
const pool = require('../utils/postgreSQL');

// Verificacion del Token de usuario 
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['x-access-token'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        };
        req.email = decoded.email;
        next();
    })
}

// Validacion de rol 
const isAdmin = async (req, res, next) => {
    let connection, response;
    try {
        connection = await pool.connect();
        response = await pool.query('SELECT * FROM users WHERE email = $1)', [req.body.email])
        if (response.rows[0].isAdmin == true) {
            next();
            return;
        } else {
            res.status(403).send({
                message: "Debes ser Administrador. Contacta a tu empresa!"
            })
        }
    } catch (error) {
        console.log(error);

    } finally {
        connection.release();
    }
    next();
}


// Validacion de rol 
const isEmployee = async (req, res, next) => {
    let connection, response;
    try {
        connection = await pool.connect();
        response = await pool.query('SELECT * FROM users WHERE email = $1)', [req.body.email])
        if (response.rows[0].isAdmin == false) {
            next();
            return;
        } else {
            res.status(403).send({
                message: "Tienes que estar logeado como empleado!"
            })
        }
    } catch (error) {
        console.log(error);

    } finally {
        connection.release();
    }
    next();
}

  module.exports = {
    verifyToken,
    isAdmin,
    isEmployee,
  } ;

