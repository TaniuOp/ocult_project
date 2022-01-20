const pool = require('../utils/postgreSQL');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Funcion para traer todos los usuarios
const getUsers = async (req, res) => {
    try {
        connection = await pool.connect();
        response = await pool.query('SELECT * FROM users')
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({"error":error});
      }finally {
        connection.release();
    }
    return res
}

const getActualUser = async (req, res) => {
    let connection,response;
    try {
        connection = await pool.connect();
        response = await pool.query('SELECT * FROM users WHERE id = $1), [1]')
        console.log(response.rows)
    } catch (error) {
        console.log(error);

    }finally {
        connection.release();
    }
    return response
}

//Funcion para crear usuario-Registrar
const createUser = async (req,res) => {
    const {id_company, username, email, password} = req.body;
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    let connection,response;
    try {
        connection = await pool.connect();
        response = await pool.query(`INSERT INTO users(id_company, name, email, password) VALUES ($1, $2, $3, $4)`,
        [
            id_company, 
            username, 
            email, 
            hashPassword,
        ]
        );
        console.log({username} ,"registrado correctamente")
    } catch (error) {
        console.log(error.detail);
        return res.status(401).send({message: error});

    } finally {
        connection.release();
    }
     return response
}

const userLogin = async (req, res) => {
    let connection, response;
    let accessToken
    try {
        const { mail, password } = req.body;
        connection = await pool.connect();
        response = await pool.query('SELECT * FROM users WHERE email = $1', [mail]);
        if (!response.rows[0]) {
            return res.status(404).send({ message: "Usuario no encontrado." });
        } else {
            const match = await bcrypt.compare(password, response.rows[0].password);
            if (!match) {
                return res.status(401).send({
                    accesToken: null,
                    message: "Contraseña incorrecta"
                })
            } else {
                const userData = ({
                    "name": response.rows[0].name,
                    "email": response.rows[0].email,
                    "image": response.rows[0].image,
                    "last_score": response.rows[0].last_score,
                })
                accessToken = jwt.sign({userData}, process.env.SECRET_JWT, {
                    expiresIn: 86400 // 24 hours
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "No se ha encontrado este correo" });
    } finally {
        connection.release();
    }
    res.status(200).json({accessToken});
}

const userScore = async(req, res) => {
    try {
        const {userEmail, questionLength, score} = req.body;
        connection = await pool.connect();
        response = await pool.query('UPDATE users SET last_score = $1, last_quiz_questions = $2 WHERE email = $3', [score, questionLength, userEmail]);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({"error":error});
    } finally {
        connection.release();
    }
}

const getUserScore = async(email, res) => {
    let connection, response;
    try {
        connection = await pool.connect();
        const result = await pool.query(`SELECT last_score, last_quiz_questions FROM users WHERE email = $1`, [email]);
        response = result.rows
    } catch (error) {
        console.log(error)
    } finally {
        connection.release();
    }
    console.log("****RESPONSE *****", response);
    return response;
}

module.exports = {
    getUsers,
    createUser,
    getActualUser,
    userLogin,
    userScore,
    getUserScore
}

 // 
        // const userId = user[0].id;
        // const name = user[0].name;
        // const email = user[0].email;
        // const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
        //     expiresIn: '15s'
        // });
        // const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
        //     expiresIn: '1d'
        // });
        // await Users.update({refresh_token: refreshToken},{
        //     where:{
        //         id: userId
        //     }
        // });
        // res.cookie('refreshToken', refreshToken,{
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000
        // });
        // res.json({ accessToken });