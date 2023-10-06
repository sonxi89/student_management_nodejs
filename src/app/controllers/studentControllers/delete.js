const db = require('../../../db/models/index');

const deleteStudent = async (req, res, next) => {
  let data = await db.Student.findOne({ where: { id: req.params.id } });
  if (data != null) {
    db.Student.destroy({ where: { id: req.params.id } })
      .then(() => db.Score.destroy({ where: { student_code: data.student_code } }))
      .then(() => db.Award.destroy({ where: { student_code: data.student_code } }))
      .then(() => res.status(200).json('delete student successfully'))
      .catch((err) => {
        console.log(err);
        res.status(500).json('delete student error');
      });
  } else {
    res.status(404).json('Do not find student');
  }
};

module.exports = deleteStudent;
