const db = require('../../../db/models/index');
const checkAwards = require('../util/checkAward');

const updateScore = async (req, res, next) => {
  let data = await db.Score.findOne({ where: { id: req.params.id } });
  // console.log(req.params);
  // console.log(req.body);
  if (data != null) {
    const countUpdated = await db.Score.update(
      {
        year_code: req.body.year_code,
        course_score_hk: req.body.course_score_hk,
        course_score_tl: req.body.course_score_tl,
        conduct_score: req.body.conduct_score,
        score_d: req.body.score_d,
        score_fail: req.body.score_fail,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    if (countUpdated != 0) {
      await db.Award.destroy({ where: { student_code: data.student_code, year_code: data.year_code } });
      const student_position = (await db.Student.findOne({ where: { student_code: data.student_code } })).student_position;
      const newData = { ...req.body, student_position };
      checkAwards(newData);
      return res.status(200).json({
        message: 'update điểm thành công',
      });
    } else {
      return res.status(403).json({ message: 'update không thành công' });
    }
  } else {
    return res.status(404).json({
      message: 'Không tồn tại sinh viên',
    });
  }
};

module.exports = updateScore;
