module.exports = app => {
    const PREGUNTA = require("../controllers/Pregunta.controllers.js");
    var router = require("express").Router();
    // Create a new pregunta
    router.post("/", PREGUNTA.create);
    // Retrieve all pregunta
    router.get("/quiz/:id", PREGUNTA.findAll);
    // Retrieve a single pregunta with id
    router.get("/:id", PREGUNTA.findOne);
    // Update a pregunta with id
    router.put("/:id", PREGUNTA.update);
    // Delete a pregunta with id
    router.delete("/:id", PREGUNTA.delete);
    // Delete all pregunta
    router.delete("/", PREGUNTA.deleteAll);

    // Todavia no se usar la api
    app.use('/api/pregunta', router);
}