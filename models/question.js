const mongoose = require('mongoose');

const objectSchema = {
    question: String,
    answers: Array
}

const questionSchema = mongoose.Schema(objectSchema);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;