const ACTIVIDAD = require("../models/Actividad.model");

// Create and Save a new Actividad

exports.create = (req, res) => {
  console.log("Creando actividad...");
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body)
  // Create a Tutorial
  const Actividad = new ACTIVIDAD({
    _id_tema: req.body._id_tema,
    Nombre: req.body.Nombre,
    Valor: req.body.Valor,
    TipoActividad: req.body.TipoActividad,
    TemaPrerrequisito: req.body.TemaPrerrequisito,
    Intentos: req.body.Intentos,
  });
  // Save Tutorial in the database
  ACTIVIDAD.create(Actividad, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Actividad.",
      });
    else res.send(data);
  });
};

// Retrieve all Laboratorio from the database (with condition).
exports.findAll = (req, res) => {
    ACTIVIDAD.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving actividad."
        });
      else res.send(data);
    });
  };


// Find a single Laboratorio with a id
exports.findOne = (req, res) => {
    ACTIVIDAD.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found actividad with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving actividad with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

// Update a Laboratorio identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  ACTIVIDAD.updateById(
    req.params.id,
    new ACTIVIDAD(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found actividad with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating actividad with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Laboratorio with the specified id in the request
exports.delete = (req, res) => {
    ACTIVIDAD.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found actividad with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete actividad with id " + req.params.id
          });
        }
      } else res.send({ message: `Actividad was deleted successfully!` });
    });
  };

// Delete all Laboratorio from the database.
exports.deleteAll = (req, res) => {
  LABORATORIO.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Laboratorios."
      });
    else res.send({ message: `All Laboratorios were deleted successfully!` });
  });
};