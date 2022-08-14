const sql = require("./db.js");

const Quiz = function(pregunta) {
    this._id = pregunta._id;
}

Quiz.create = (newQuiz, result) => {
    sql.query("INSERT INTO quiz SET ?", newQuiz, (err, res) => {
        if(err) {
            console.log("error: " , err);
            result(err, null);
            return;
        }
        console.log("created quiz: ", {id: res.inserId, ...newQuiz});
        result(null, {id: res.inserId, ...newQuiz})
    })
}

Quiz.findById = (id, result) => {
    sql.query(`SELECT * FROM quiz WHERE _id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          if (res.length) {
            console.log("found QUIZ: ", res[0]);
            result(null, res[0]);
            return;
          }
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
    });
}

module.exports = Quiz