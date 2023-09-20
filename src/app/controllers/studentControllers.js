const e = require('express');
const db = require('../../db/models/index');
const moment = require('moment');
const XLSX = require('xlsx');
var Sequelize = require('sequelize');
const dateFormat = 'DD/MM/YYYY';
const checkAward = require('./util/checkAward');
const PAGE_SIZE = 10;

class studentController {
  async upload(req, res, next) {
    if (!req.file) {
      return res.status(404).json({
        message: 'No file uploaded',
      });
    }

    try {
      const wb = XLSX.readFile('./uploads/import.xlsx', { cellDates: true });
      const ws = wb.Sheets['Sheet1'];
      const dataStudent = XLSX.utils.sheet_to_json(ws);
      console.log(dataStudent);

      for (const rowData of dataStudent) {
        const msv = rowData.student_code;
        const year = rowData.year_code;
        const dobFormatted = moment(rowData.student_dob, dateFormat).toDate();
        console.log(dobFormatted);

        const [studentInstance, studentCreated] = await db.Student.findOrCreate({
          where: { student_code: msv },
          defaults: {
            student_name: rowData.student_name,
            student_dob: dobFormatted,
            student_position: rowData.student_position,
            class_code: rowData.class_code,
          },
        });

        const [yearInstance, yearCreated] = await db.AcademicYear.findOrCreate({
          where: { year_code: year },
          defaults: {},
        });

        const [scoreInstance, scoreCreated] = await db.Score.findOrCreate({
          where: { student_code: msv, year_code: year },
          defaults: {
            course_score_hk: rowData.course_score_hk,
            course_score_tl: rowData.course_score_tl,
            conduct_score: rowData.conduct_score,
            score_d: rowData.score_d,
            score_fail: rowData.score_fail,
          },
        });
        if (scoreCreated) {
          checkAward(rowData);
        }
      }
      res.status(200).json({ message: 'Data uploaded and saved' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing data' });
    }
  }
  //get ra tất cả bản ghi
  async getUser(req, res, next) {
    try {
      const combinedData = await db.Student.findAll({
        include: [
          {
            model: db.Score,
            on: {
              col1: db.sequelize.where(db.sequelize.col('Student.student_code'), '=', db.sequelize.col('Scores.student_code')),
            },
          },
          {
            model: db.Award,
            on: {
              col1: db.sequelize.where(db.sequelize.col('Student.student_code'), '=', db.sequelize.col('Awards.student_code')),
              col2: db.sequelize.where(db.sequelize.col('Scores.year_code'), '=', db.sequelize.col('Awards.year_code')),
            },
          },
        ],
        raw: true,
      });
      res.status(200).json(combinedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  //phân trang
  getUserPage(req, res, next) {
    let pageNumber = parseInt(req.query.page);
    let offset = (pageNumber - 1) * PAGE_SIZE;
    db.Student.findAll({
      include: [
        {
          model: db.Score,
          on: {
            col1: db.sequelize.where(db.sequelize.col('Student.student_code'), '=', db.sequelize.col('Scores.student_code')),
          },
        },
        {
          model: db.Award,
          on: {
            col1: db.sequelize.where(db.sequelize.col('Student.student_code'), '=', db.sequelize.col('Awards.student_code')),
            col2: db.sequelize.where(db.sequelize.col('Scores.year_code'), '=', db.sequelize.col('Awards.year_code')),
          },
        },
      ],
      limit: PAGE_SIZE,
      offset: offset,
      raw: true,
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //awards
  getAwards(req, res, next) {
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
  }
  //create
  async create(req, res, next) {
    try {
      const data = req.body;

      const [studentInstance, studentCreated] = await db.Student.findOrCreate({
        where: { student_code: data.student_code },
        defaults: {
          student_name: data.student_name,
          student_dob: data.student_dob,
          student_position: data.student_position,
          class_code: data.class_code,
        },
      });

      const [yearInstance, yearCreated] = await db.AcademicYear.findOrCreate({
        where: { year_code: data.year_code },
        defaults: {},
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
        checkAward(data);
        res.status(200).json('tạo thành công');
      }
    } catch (error) {
      console.log(error);
      res.status(404).json('error creating student');
    }
  }
  //delete student
  async delete(req, res, next) {
    let data = await db.Student.findOne({ where: { id: req.params.id } });
    if (data != null) {
      db.Student.destroy({ where: { id: req.params.id } })
        // .then(() => db.Score.destroy({ where: { student_code: data.student_code } }))
        // .then(() => db.Award.destroy({ where: { student_code: data.student_code } }))
        .then(() => res.status(200).json('delete student successfully'))
        .catch((err) => {
          console.log(err);
          res.status(500).json('delete student error');
        });
    } else {
      res.status(404).json('Do not find student');
    }
  }
  //update student
  // async update(req, res, next) {
  //   let data = await db.Student.findOne({ where: { id: req.params.id }});
  //   if(data != null) {
  //     db.Student.update
  //   }
  // }
}

module.exports = new studentController();
