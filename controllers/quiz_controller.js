var models = require('../models/models.js');


exports.index = function (req, res) {
    models.Quiz.findAll().then(function (quizes) {
        res.render('quizes/index', { quizes: quizes })
    });
};

//GET /quizes/question
exports.show = function (req, res) {
    models.Quiz.find(req.params.quizId).then(function (quiz) {
        res.render('quizes/show', { quiz: quiz });
    });
};

//GET /quizes/answer
exports.answer = function (req, res) {
    models.Quiz.find(req.params.quizId).then(function (quiz) {
        var answer = 'Incorrecto';
        if (req.query.respuesta === quiz.respuesta) {
            answer = 'Correcto';
        }
        res.render('quizes/answer', { quiz: quiz, respuesta: answer });
    });
};