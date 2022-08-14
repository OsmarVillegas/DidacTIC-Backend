const Quiz = require("../models/Quiz.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    const quiz = new Quiz({
        _id: req.body._id
    });

    Quiz.create(quiz, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Quiz."
        });
        else res.send(data)
    });
};

exports.findOne = (req, res) => {
    Quiz.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Quiz with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Quiz with id " + req.params.id
              });
            }
          } else res.send(data);
    })
}