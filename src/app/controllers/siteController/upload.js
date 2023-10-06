const e = require('express');
const db = require('../../../db/models/index');
const moment = require('moment');
const XLSX = require('xlsx');
const dateFormat = 'DD/MM/YYYY';
const checkAward = require('../util/checkAward');

const upload = async (req, res, next) => {
  const uploadedFiles = req.files;

  try {
    uploadedFiles.forEach(async (file) => {
      const wb = XLSX.read(file.buffer, { cellDates: true });
      const ws = wb.Sheets['Sheet1'];
      const dataStudent = XLSX.utils.sheet_to_json(ws);

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
    });
    res.status(200).json({ message: 'Upload successful' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while processing data' });
  }
};

module.exports = upload;
