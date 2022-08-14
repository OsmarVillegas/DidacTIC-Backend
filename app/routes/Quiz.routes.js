module.exports = app => {
    const Quiz = require("../controllers/Quiz.controllers.js");
    var router = require("express").Router();
    router.post("/", Quiz.create);
    router.get("/:id", Quiz.findOne);

    app.use('/api/quiz', router);
}