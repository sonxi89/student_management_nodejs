const db = require('../../../db/models/index');
const PAGE_SIZE = 2;
const updateStudent = require('./update');
const deleteStudent = require('./delete');
const createStudent = require('./create');
const listStudent = require('./listStudent');
const list = require('./list');
const deleteScore = require('./deleteScore');
const listAwards = require('./listAwards');
const updateScore = require('./updataScore');
const listScore = require('./listScore');
const statistics = require('./statistics');
const report = require('./report');

class studentController {
  //get ra tất cả bản ghi
  async getAll(req, res, next) {
    await list(req, res, next);
  }

  async report(req, res, next) {
    await report(req, res, next);
  }

  async statistics(req, res, next) {
    await statistics(req, res, next);
  }

  //list sinh vien
  async getStudent(req, res, next) {
    await listStudent(req, res, next);
  }

  //list score
  async getScore(req, res, next) {
    await listScore(req, res, next);
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

  async deleteScore(req, res, next) {
    await deleteScore(req, res, next);
  }

  async updateScore(req, res, next) {
    await updateScore(req, res, next);
  }
}

module.exports = new studentController();
