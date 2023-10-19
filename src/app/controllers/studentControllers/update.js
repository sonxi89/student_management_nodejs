const db = require('../../../db/models/index');

const updateStudent = async (req, res, next) => {
  let data = await db.Student.findOne({ where: { id: req.params.id } });
  console.log(req.params);
  console.log(req.body);
  if (data != null) {
    db.Student.update(
      {
        student_code: req.body.student_code,
        student_name: req.body.student_name,
        student_dob: req.body.student_dob,
        student_position: req.body.student_position,
        class_code: req.body.class_code,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    )
      .then(() => {
        db.Score.update(
          {
            student_code: req.body.student_code,
          },
          { where: { student_code: data.student_code } },
        );
      })
      .then(() => {
        db.Award.update(
          {
            student_code: req.body.student_code,
          },
          { where: { student_code: data.student_code } },
        );
      })
      .then(() => {
        return res.status(200).json({
          message: 'Update thành công sinh viên id: ' + req.params.id,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'Update không thành công',
        });
      });
  } else {
    return res.status(404).json({
      message: 'Không tồn tại sinh viên',
    });
  }
};

module.exports = updateStudent;
