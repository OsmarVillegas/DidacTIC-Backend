module.exports = app => {
    const ACTIVIDAD = require("../controllers/Actividad.controllers");
    var router = require("express").Router();
    // Create a new Actividad
    router.post("/", ACTIVIDAD.create);
    // Retrieve all Actividad
    router.get("/", ACTIVIDAD.findAll);
    // Retrieve a single Actividad with id
    router.get("/:id", ACTIVIDAD.findOne);
    // Update a Actividad with id
    router.put("/:id", ACTIVIDAD.update);
    // Delete a Actividad with id
    router.delete("/:id", ACTIVIDAD.delete);
    // Delete all Actividad
    router.delete("/", ACTIVIDAD.deleteAll);

    // Todavia no se usar la api
    app.use('/api/actividad', router);
}