const db = require('../../../db/models/index');
var Sequelize = require('sequelize');
const PAGE_SIZE = 10;

const listAwards = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * PAGE_SIZE;
  let where_student = {
    [Sequelize.Op.or]: [],
  };

  let where_award = {
    [Sequelize.Op.and]: [],
  };

  if (req.query.class) {
    where_student[Sequelize.Op.and].push({ class: req.query.class });
  }
  if (req.query.year) {
    where_award[Sequelize.Op.and].push({ year_code: req.query.year });
  }
  if (req.query.majors) {
    where_student[Sequelize.Op.and].push({ majors: req.query.majors });
  }
  if (req.query.faculty) {
    where_student[Sequelize.Op.and].push({ faculty: req.query.faculty });
  }
  if (req.query.type) {
    where_award[Sequelize.Op.and].push({ award_type: { [Sequelize.Op.like]: '%' + req.query.type + '%' } });
  }

  if (req.query.search) {
    const searchConditionStudent = {
      [Sequelize.Op.or]: [
        { student_name: { [Sequelize.Op.like]: `%${req.query.search}%` } },
        { class: { [Sequelize.Op.like]: `%${req.query.search}%` } },
        { faculty: { [Sequelize.Op.like]: `%${req.query.search}%` } },
        { majors: { [Sequelize.Op.like]: `%${req.query.search}%` } },
      ],
    };

    const searchConditionAward = {
      [Sequelize.Op.or]: [
        { award_type: { [Sequelize.Op.like]: `%${req.query.search}%` } },
        { year_code: { [Sequelize.Op.like]: `%${req.query.search}%` } },
        { student_code: { [Sequelize.Op.like]: `%${req.query.search}%` } },
      ],
    };
    where_student[Sequelize.Op.or].push(searchConditionStudent);
    where_award[Sequelize.Op.and].push(searchConditionAward);
  }

  if (req.query.page) {
    try {
      const { count, rows } = await db.Award.findAndCountAll({
        where: where_award,
        include: [
          {
            model: db.Student,
            required: true,
            on: {
              col1: db.sequelize.where(db.sequelize.col('Award.student_code'), '=', db.sequelize.col('Student.student_code')),
            },
            where: (req.query.majors || req.query.faculty || req.query.class || req.query.search) != null ? where_student : null,
            // where: where_student,
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
  } else {
    try {
      const { count, rows } = await db.Award.findAndCountAll({
        where: (req.query.year || req.query.type || req.query.search) != null ? where_award : null,
        include: [
          {
            model: db.Student,
            required: true,
            on: {
              col1: db.sequelize.where(db.sequelize.col('Award.student_code'), '=', db.sequelize.col('Student.student_code')),
            },
            where: (req.query.majors || req.query.faculty || req.query.class) != null ? where_student : null,
          },
        ],
        raw: true,
        nested: true,
      });

      const results = {
        data: rows,
      };
      res.status(200).json(results);
    } catch (err) {
      console.log(err);
    }
  }
};
module.exports = listAwards;
