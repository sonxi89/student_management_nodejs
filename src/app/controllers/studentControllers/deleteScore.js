const db = require('../../../db/models/index');

const deleteScore = async (req, res, next) => {
  let data = await db.Score.findOne({ where: { id: req.params.id } });
  if (data != null) {
    db.Score.destroy({ where: { id: req.params.id } })
      .then(() => db.Award.destroy({ where: { student_code: data.student_code, year_code: data.year_code } }))
      .then(() => res.status(200).json(`Xóa bản ghi id: ${req.params.id} thành công`))
      .catch((err) => {
        console.log(err);
        res.status(500).json('Lỗi server');
      });
  } else {
    res.status(404).json('Không tìm thấy bản ghi');
  }
};

module.exports = deleteScore;
