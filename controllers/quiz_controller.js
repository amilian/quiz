var models = require('../models/models.js');

//GET /quizes/question
exports.question = function (req, res) {
    models.Quiz.findAll().success(function (quiz) {
        res.render('quizes/question', { pregunta: quiz[0].pregunta });
    });
};

//GET /quizes/answer
exports.answer = function (req, res) {
    models.Quiz.findAll().success(function (quiz) {
        var answer = 'Incorrecto';
        if (req.query.respuesta === 'Roma') {
            answer = 'Correcto';
        }
        res.render('quizes/answer', { respuesta: answer });
    });
};