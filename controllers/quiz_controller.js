var models = require('../models/models.js');


exports.load = function (req, res, next, quizId) {
    models.Quiz.find(quizId).then(
        function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
                next(new Error('No existe quizId=' + quizId));
            }
        }
    ).catch(function (error) { next(error) });
};


exports.index = function (req, res) {
    var where = undefined;
    if (req.query.search) {
        where = { where: ["pregunta like ?", '%' + req.query.search.replace(' ', '%') + '%'] };
    }

    models.Quiz.findAll(where).then(function (quizes) {
        res.render('quizes/index', { quizes: quizes })
    }).catch(function (error) { next(error) });
};

//GET /quizes/question
exports.show = function (req, res) {
        res.render('quizes/show', { quiz: req.quiz });
};

//GET /quizes/answer
exports.answer = function (req, res) {    
        var answer = 'Incorrecto';
        if (req.query.respuesta === req.quiz.respuesta) {
            answer = 'Correcto';
        }
        res.render('quizes/answer', { quiz: req.quiz, respuesta: answer });   
};

exports.new = function (req, res) {
    res.render('quizes/new', { quiz: { pregunta: "", respuesta: "" } });
};

exports.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz);
    quiz.save({ fields: ["pregunta", "respuesta"] }).then(function () {
        res.redirect('/quizes');
    });
};