const mongoose = require('mongoose');

const objectSchema = {
    username: {type: String, unique : true},
    name: {type: String},
    password: {type: String},
    quiz_done: Boolean,
    logged: Boolean,
    email: String,
    correct_answers: Number
}

const userSchema = mongoose.Schema(objectSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;