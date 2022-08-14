module.exports = app => {
    const LABORATORIO = require("../controllers/Laboratorio.controllers.js");
    var router = require("express").Router();
    // Create a new laboratorio
    router.post("/", LABORATORIO.create);
    // Retrieve all laboratorio
    router.get("/", LABORATORIO.findAll);
    // Retrieve a single laboratorio with id
    router.get("/:id", LABORATORIO.findOne);
    // Update a laboratorio with id
    router.put("/:id", LABORATORIO.update);
    // Delete a laboratorio with id
    router.delete("/:id", LABORATORIO.delete);
    // Delete all laboratorio
    router.delete("/", LABORATORIO.deleteAll);

    app.use('/api/laboratorio', router);
}