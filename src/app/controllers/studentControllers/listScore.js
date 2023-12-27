const db = require('../../../db/models/index');
const { sequelize } = require('../../../config/connectDB');
const PAGE_SIZE = 10;
const { QueryTypes } = require('sequelize');

const listScore = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * PAGE_SIZE;
  let whereOr = '';
  let a;
  if (req.query.search) {
    whereOr += `Student.majors_name like '%${req.query.search}%'
    or Student.faculty_name like '%${req.query.search}%'
    or Student.student_code like '%${req.query.search}%'
    or Student.student_name like '%${req.query.search}%'
    or Student.class_name like '%${req.query.search}%'
    or Score.year_code like '%${req.query.search}%'
    or Score.conduct_score like '%${req.query.search}%'
    or Score.course_score_hk like '%${req.query.search}%'`;
  }

  if (whereOr) {
    a = ' where ' + whereOr;
  } else {
    a = '';
  }

  try {
    let queryCount = 'SELECT count(Score.id) as `count` from `Score` as `Score` inner join `Student` as `Student` on`Score`.`student_code` = `Student`.`student_code`' + a + ';';
    let queryString =
      'select `Score`.*,`Student`.`student_code`,`Student`.`student_name`,`Student`.`student_dob`,`Student`.`class_name`,`Student`.`majors_name`,`Student`.`faculty_name`,`Student`.`student_position` from `Score` as `Score` inner join `Student` as `Student` on `Score`.`student_code` = `Student`.`student_code`' +
      a +
      ' limit ' +
      offset +
      ',' +
      PAGE_SIZE;
    const data = await sequelize.query(queryString, { type: QueryTypes.SELECT });
    const count = (await sequelize.query(queryCount, { type: QueryTypes.SELECT }))[0].count;

    const results = {
      data: data,
      pagination: {
        page,
        total: count,
      },
    };

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = listScore;
