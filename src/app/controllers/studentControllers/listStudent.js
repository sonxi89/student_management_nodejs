const { sequelize } = require('../../../config/connectDB');

const db = require('../../../db/models/index');
const { QueryTypes } = require('sequelize');

const PAGE_SIZE = 10;

const listStudent = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * PAGE_SIZE;
  let whereOr = '';
  let a;
  if (req.query.search) {
    whereOr += `Student.majors_name like '%${req.query.search}%'
    or Student.faculty_name like '%${req.query.search}%'
    or Student.student_code like '%${req.query.search}%'
    or Student.student_name like '%${req.query.search}%'
    or Student.class_name like '%${req.query.search}%'`;
  }

  if (whereOr) {
    a = ' where ' + whereOr;
  } else {
    a = '';
  }

  try {
    let queryCount = 'SELECT count(Student.id) as `count` from `Student` as `Student`' + a + ';';
    let queryString = 'SELECT * FROM `Student` as `Student`' + a + ' limit ' + offset + ',' + PAGE_SIZE;
    const students = await sequelize.query(queryString, { type: QueryTypes.SELECT });
    const count = (await sequelize.query(queryCount, { type: QueryTypes.SELECT }))[0].count;

    const results = {
      data: students,
      pagination: {
        page,
        total: count,
      },
    };

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = listStudent;
