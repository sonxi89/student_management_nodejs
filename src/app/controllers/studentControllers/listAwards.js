const db = require('../../../db/models/index');
var Sequelize = require('sequelize');
const PAGE_SIZE = 10;

const listAwards = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * PAGE_SIZE;
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

  try {
    const { count, rows } = await db.Award.findAndCountAll({
      where: req.query.year != null ? where_award : req.query.type ? where_award : null,
      include: [
        {
          model: db.Student,
          required: true,
          on: {
            col1: db.sequelize.where(db.sequelize.col('Award.student_code'), '=', db.sequelize.col('Student.student_code')),
          },
          where: req.query.class != null ? where_student : null,
        },
      ],
      raw: true,
      nested: true,
      limit: PAGE_SIZE,
      offset,
    });

    const results = {
      data: rows,
      pagination: {
        page,
        total: count,
      },
    };
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
  }
};
module.exports = listAwards;
