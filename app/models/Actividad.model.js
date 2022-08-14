const sql = require("./db.js");
// constructor

const ACTIVIDAD = function(act) {
  this._id_tema = act._id_tema,
  this.Nombre = act.Nombre;
  this.Valor = act.Valor;
  this.TipoActividad = act.TipoActividad;
  this.TemaPrerrequisito = act.TemaPrerrequisito;
  this.Intentos = act.Intentos;

};

ACTIVIDAD.create = (newAct, result) => {
  console.log(newAct)
  sql.query("INSERT INTO actividad SET ?", newAct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created actividad: ", { id: res.insertId, ...newAct });
    result(null, { id: res.insertId, ...newAct });
  });
};

ACTIVIDAD.findById = (id, result) => {
  sql.query(`SELECT * FROM actividad WHERE _id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found actividad: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

ACTIVIDAD.getAll = (result) => {
  let query = "SELECT * FROM actividad";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("actividad: ", res);
    result(null, res);
  });
};

ACTIVIDAD.updateById = (id, act, result) => {
  sql.query(
    "UPDATE actividad SET Nombre = ?, Valor = ?, TipoActividad = ?, TemaPrerrequisito = ?, Intentos = ?  WHERE _id = ?",
    [act.Nombre, act.Valor ,act.TipoActividad , act.TemaPreRequisito,act.Intentos , id],
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
      console.log("updated actividad: ", { id: id, ...act });
      result(null, { id: id, ...act });
    }
  );
};

ACTIVIDAD.remove = (id, result) => {
  sql.query("DELETE FROM actividad WHERE _id = ?", id, (err, res) => {
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
    console.log("deleted actividad with id: ", id);
    result(null, res);
  });
};

ACTIVIDAD.removeAll = result => {
  sql.query("DELETE FROM actividad", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} actividad`);
    result(null, res);
  });
};

module.exports = ACTIVIDAD;