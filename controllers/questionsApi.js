const Question = require('../models/question');

const getAllQuestions = async(req, res) => {
    let data;
    try {
        alldata = await Question.find({}, '-_id');
        data = alldata
        // .slice(0, 4)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({"error":error});
    }
};

module.exports = getAllQuestions;
