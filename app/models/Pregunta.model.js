const sql = require("./db.js");
// constructor

const PREGUNTA = function(quiz) {
  this._id_quiz = quiz._id_quiz;
  this.Pregunta = quiz.Pregunta;
  this.TipoPregunta = quiz.TipoPregunta;
  this.Nivel = quiz.Nivel;
  this.Valor = quiz.Valor;
  this.Respuesta = quiz.Respuesta;
};

PREGUNTA.create = (newPreg, result) => {
  console.log(newPreg)
  sql.query("INSERT INTO pregunta SET ?", newPreg, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created pregunta: ", { id: res.insertId, ...newPreg });
    result(null, { id: res.insertId, ...newPreg });
  });
};

PREGUNTA.findById = (id, result) => {
  sql.query(`SELECT * FROM pregunta WHERE _id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found Pregunta: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

PREGUNTA.getAll = (id, result) => {
  let query = "SELECT * FROM pregunta WHERE _id_quiz = "+ id ;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("preguntas: ", res);
    result(null, res);
  });
};

PREGUNTA.updateById = (id, quiz, result) => {
  sql.query(
    "UPDATE pregunta SET Pregunta = ?, Tipo = ?, Nivel = ?, Valor = ?, Respuesta = ? WHERE _id = ?",
    [quiz.Pregunta, quiz.Tipo, quiz.Nivel, quiz.Valor, quiz.Respuesta, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated quiz: ", { id: id, ...quiz });
      result(null, { id: id, ...quiz });
    }
  );
};

PREGUNTA.remove = (id, result) => {
  sql.query("DELETE FROM pregunta WHERE _id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted pregunta with id: ", id);
    result(null, res);
  });
};

PREGUNTA.removeAll = result => {
  sql.query("DELETE FROM pregunta", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} preguntas`);
    result(null, res);
  });
};

module.exports = PREGUNTA;