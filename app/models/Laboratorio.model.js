const sql = require("./db.js");
// constructor

const LABORATORIO = function(lab) {
  this._id = lab._id;
  this.file = lab.file;
};

LABORATORIO.create = (newLab, result) => {
  sql.query("INSERT INTO laboratorio SET ?", newLab, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created laboratorio: ", { id: res.insertId, ...newLab });
    result(null, { id: res.insertId, ...newLab });
  });
};

LABORATORIO.findById = (id, result) => {
  sql.query(`SELECT * FROM laboratorio WHERE _id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found laboratorio: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

LABORATORIO.getAll = result => {
  let query = "SELECT * FROM laboratorio";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("laboratorio: ", res);
    result(null, res);
  });
};

LABORATORIO.updateById = (id, lab, result) => {
  sql.query(
    "UPDATE laboratorio SET file = ? WHERE _id = ?",
    [lab.file, id],
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
      console.log("updated laboratorio: ", { id: id, ...lab });
      result(null, { id: id, ...lab });
    }
  );
};

LABORATORIO.remove = (id, result) => {
  sql.query("DELETE FROM laboratorio WHERE _id = ?", id, (err, res) => {
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
    console.log("deleted laboratorio with id: ", id);
    result(null, res);
  });
};

LABORATORIO.removeAll = result => {
  sql.query("DELETE FROM laboratorio", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} laboratorio`);
    result(null, res);
  });
};

module.exports = LABORATORIO;