const db = require('../../../db/models/index');
var Sequelize = require('sequelize');

const listAwards = async (req, res, next) => {
  let where_student = {
    [Sequelize.Op.and]: [],
  };

  let where_award = {
    [Sequelize.Op.and]: [],
  };

  if (req.query.class) {
    where_student[Sequelize.Op.and].push({ class_code: req.query.class });
  }
  if (req.query.year) {
    where_award[Sequelize.Op.and].push({ year_code: req.query.year });
  }
  if (req.query.type) {
    where_award[Sequelize.Op.and].push({ award_type: { [Sequelize.Op.like]: '%' + req.query.type + '%' } });
  }

  db.Student.findAll({
    where: req.query.class != null ? where_student : null,
    include: [
      {
        model: db.Award,
        required: true,
        on: {
          col1: db.sequelize.where(db.sequelize.col('Student.student_code'), '=', db.sequelize.col('Awards.student_code')),
        },
        where: req.query.year != null ? where_award : req.query.type ? where_award : null,
      },
    ],
    raw: true,
    nested: true,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = listAwards;
