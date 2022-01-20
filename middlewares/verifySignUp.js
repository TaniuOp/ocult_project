const pool = require('../utils/postgreSQL');

// Funcion que valida si el correo a registrar ya existe 
const checkDuplicateEmail = async (req, res,next) => {
    let connection,response;
    try {
        connection = await pool.connect();
        response = await pool.query('SELECT * FROM users WHERE email = $1)', [req.body.email])
        if(response.rows){
            console.log(' El usuario ya está registrado')
        } else {
            return response
        }
    } catch (error) {
        console.log(error);

    }finally {
        connection.release();
    }
    next();
}


module.exports = {
    checkDuplicateEmail
}