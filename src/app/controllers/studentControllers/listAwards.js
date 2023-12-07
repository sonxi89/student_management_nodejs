const { sequelize } = require('../../../config/connectDB');

const PAGE_SIZE = 10;
const { QueryTypes } = require('sequelize');

const listAwards = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * PAGE_SIZE;
  let whereOr = '';
  let conditions = [];

  if (req.query.class) {
    conditions.push(`Student.class_name like '%${req.query.class}%'`);
  }
  if (req.query.year) {
    conditions.push(`Award.year_code like '%${req.query.year}%'`);
  }
  if (req.query.majors) {
    conditions.push(`Student.majors_name like '%${req.query.majors}%'`);
  }
  if (req.query.faculty) {
    conditions.push(`Student.faculty_name like '%${req.query.faculty}%'`);
  }
  if (req.query.type) {
    conditions.push(`Award.award_type like '%${req.query.type}%'`);
  }

  let whereAnd = conditions.length > 0 ? conditions.join(' and ') : '';

  if (req.query.search) {
    whereOr += `Student.majors_name like '%${req.query.search}%'
    or Student.faculty_name like '%${req.query.search}%'
    or Student.student_code like '%${req.query.search}%'
    or Student.student_name like '%${req.query.search}%'
    or Student.class_name like '%${req.query.search}%'
    or Award.student_code like '%${req.query.search}%'
    or Award.year_code like '%${req.query.search}%'
    or Award.award_type like '%${req.query.search}%'`;
  }
  if (whereAnd && whereOr) {
    a = ' where (' + whereAnd + 'and (' + whereOr + '))';
  }
  if (whereAnd && !whereOr) {
    a = ' where ' + whereAnd;
  }

  if (!whereAnd && whereOr) {
    a = ' where ' + whereOr;
  }

  if (!whereAnd && !whereOr) {
    a = '';
  }

  if (req.query.page) {
    try {
      let queryCount = 'SELECT count(Award.id) as `count` from `Award` as `Award` inner join `Student` as `Student` on`Award`.`student_code` = `Student`.`student_code`' + a + ';';
      let queryString = 'SELECT * FROM `Award` as `Award` inner join `Student` as `Student` on`Award`.`student_code` = `Student`.`student_code`' + a + ' limit ' + offset + ',' + PAGE_SIZE;
      const awards = await sequelize.query(queryString, { type: QueryTypes.SELECT });
      const count = (await sequelize.query(queryCount, { type: QueryTypes.SELECT }))[0].count;
      const results = {
        data: awards,
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
      let queryString = 'SELECT * FROM `Award` as `Award` inner join `Student` as `Student` on`Award`.`student_code` = `Student`.`student_code`' + a;
      const awards = await sequelize.query(queryString, { type: QueryTypes.SELECT });
      const results = {
        data: awards,
      };
      res.status(200).json(results);
    } catch (e) {
      console.log(e);
    }
  }
};
module.exports = listAwards;
