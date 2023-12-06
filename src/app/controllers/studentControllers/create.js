const db = require('../../../db/models/index');
const checkAward = require('../util/checkAward');

const createStudent = async (req, res, next) => {
  try {
    const data = req.body;

    const [studentInstance, studentCreated] = await db.Student.findOrCreate({
      where: { student_code: data.student_code },
      defaults: {
        student_name: data.student_name,
        student_dob: data.student_dob,
        student_position: data.student_position,
        class_name: data.class_name,
      },
    });

    const [classInstance, classCreated] = await db.Class.findOrCreate({
      where: { class_name: data.class_name, majors_name: data.majors_name },
      default: {},
    });

    const [majorsInstance, majorsCreated] = await db.Majors.findOrCreate({
      where: { majors_name: data.majors_name, faculty_name: data.faculty_name },
      default: {},
    });

    const [facultyInstance, facultyCreated] = await db.Faculty.findOrCreate({
      where: { faculty_name: data.faculty_name },
      default: {},
    });

    const [scoreInstance, scoreCreated] = await db.Score.findOrCreate({
      where: { student_code: data.student_code, year_code: data.year_code },
      defaults: {
        course_score_hk: data.course_score_hk,
        course_score_tl: data.course_score_tl,
        conduct_score: data.conduct_score,
        score_d: data.score_d,
        score_fail: data.score_fail,
      },
    });

    if (!scoreCreated) {
      res.status(200).json('bản ghi đã tồn tại');
    } else {
      //fix phần khi tạo phải xét khen thưởng lại cho sinh viên đó
      checkAward(data);
      res.status(200).json('tạo thành công');
    }
  } catch (error) {
    console.log(error);
    res.status(404).json('error creating student');
  }
};

module.exports = createStudent;
