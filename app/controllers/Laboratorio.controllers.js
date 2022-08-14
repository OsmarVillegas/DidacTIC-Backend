const LABORATORIO = require("../models/Laboratorio.model");

// Create and Save a new Laboratorio

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Laboratorio
  const laboratorio = new LABORATORIO({
    _id: req.body._id,
    file: req.body.file,
  });
  // Save Laboratorio in the database
  LABORATORIO.create(laboratorio, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Laboratorio.",
      });
    else res.send(data);
  });
};

// Retrieve all Laboratorio from the database (with condition).
exports.findAll = (req, res) => {
    LABORATORIO.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving laboratorio."
        });
      else res.send(data);
    });
  };


// Find a single Laboratorio with a id
exports.findOne = (req, res) => {
    LABORATORIO.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found laboratorio with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving laboratorio with id " + req.params.id
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
  LABORATORIO.updateById(
    req.params.id,
    new LABORATORIO(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found laboratorio with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating laboratorio with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Laboratorio with the specified id in the request
exports.delete = (req, res) => {
    LABORATORIO.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found laboratorio with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete laboratorio with id " + req.params.id
          });
        }
      } else res.send({ message: `Laboratorio was deleted successfully!` });
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