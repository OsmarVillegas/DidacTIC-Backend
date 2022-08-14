const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Rutas
require("./app/routes/Laboratorio.routes.js")(app)
require("./app/routes/Actividad.routes.js")(app)
require("./app/routes/Pregunta.routes.js")(app)
require("./app/routes/Quiz.routes.js")(app)
// require("./app/routes/Quiz.routes.js")(app)
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a Didactic." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

