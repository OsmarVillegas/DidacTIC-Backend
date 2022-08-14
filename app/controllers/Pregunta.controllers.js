const PREGUNTA = require("../models/Pregunta.model.js");

// Create and Save a new Pregunta

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Pregunta
  const pregunta = new PREGUNTA({
    _id_quiz: req.body._id_quiz,
    Pregunta: req.body.Pregunta,
    TipoPregunta: req.body.TipoPregunta,
    Nivel: req.body.Nivel,
    Valor: req.body.Valor,
    Respuesta: req.body.Respuesta
  });
  // Save Pregunta in the database
  PREGUNTA.create(pregunta, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pregunta.",
      });
    else res.send(data);
  });
};

// Retrieve all Pregunta from the database (with condition).
exports.findAll = (req, res) => {
    PREGUNTA.getAll(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Pregunta."
        });
      else res.send(data);
    });
  };


// Find a single Pregunta with a id
exports.findOne = (req, res) => {
    PREGUNTA.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pregunta with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Pregunta with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Update a Pregunta identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  PREGUNTA.updateById(
    req.params.id,
    new LABORATORIO(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pregunta with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Pregunta with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Pregunta with the specified id in the request
exports.delete = (req, res) => {
    PREGUNTA.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pregunta with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Pregunta with id " + req.params.id
          });
        }
      } else res.send({ message: `Pregunta was deleted successfully!` });
    });
  };

// Delete all Pregunta from the database.
exports.deleteAll = (req, res) => {
    PREGUNTA.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Pregunta."
        });
      else res.send({ message: `All Pregunta were deleted successfully!` });
    });
  };