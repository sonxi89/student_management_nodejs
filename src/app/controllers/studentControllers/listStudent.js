const db = require('../../../db/models/index');

const listStudent = async (req, res, next) => {
  db.Student.findAll({})
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

module.exports = listStudent;
