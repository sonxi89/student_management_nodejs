const db = require('../../../db/models/index');
const PAGE_SIZE = 10;
const updateStudent = require('./update');
const deleteStudent = require('./delete');
const createStudent = require('./create');
const listStudent = require('./listStudent');
const list = require('./list');
const listAwards = require('./listAwards');

class studentController {
  //get ra tất cả bản ghi
  async getAll(req, res, next) {
    await list(req, res, next);
  }

  //list sinh vien
  async getStudent(req, res, next) {
    await listStudent(req, res, next);
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
  //get ra tất cả sinh viên được khen thưởng & lọc theo trường class, type, year
  async getAwards(req, res, next) {
    await listAwards(req, res, next);
  }
  //create
  async create(req, res, next) {
    await createStudent(req, res, next);
  }
  //delete student
  async delete(req, res, next) {
    await deleteStudent(req, res, next);
  }
  //update student
  async update(req, res, next) {
    await updateStudent(req, res, next);
  }
}

module.exports = new studentController();
