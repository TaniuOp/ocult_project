const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createUser = async(req, res) => {
    let data;
    try {
        data = await User.create({'name': req.body.name, 'password': req.body.password, 'username': req.body.username, 'correct_answers': 0, 'email': req.body.email, 'quiz_done': false, 'logged': false})
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({'error': error})
    }
};

const loginRouter = async(req, res) => {
    try {
        let data = await User.findOne({'username': req.body.username, 'password': req.body.password}, '-_id');
        const {name, username} = data;
        const userForToken = {
            name: name,
            username: username
        }
        
        const token = jwt.sign(userForToken, process.env.SECRET)
        const info = {name, username, token}
        res.status(200).json(info);
        
    } catch (error) {
        res.status(401).json({error: 'Invalid user or password'})
    }
};

const userScore = async(req, res) => {
    let data;
    try {
        const filter = { username: req.body.username };
        const update = { correct_answers: req.body.correct_answers,  quiz_done: true};
        data = await User.findOneAndUpdate(filter, update, {new: true});
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({'error': error})
    }
}

const userApi = {
    loginRouter,
    createUser,
    userScore
};

module.exports = userApi;