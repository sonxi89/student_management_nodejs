const e = require('express');
const db = require('../../../db/models/index');
const moment = require('moment');
const XLSX = require('xlsx');
const dateFormat = 'DD/MM/YYYY';
const checkAward = require('../util/checkAward');

//Xét khen thưởng
const processAwards = async () => {
  try {
    // Đọc dữ liệu từ bảng Score và Student
    const scores = await db.Score.findAll({
      raw: true,
    });
    for (const score of scores) {
      const studentPosition = (
        await db.Student.findOne({
          where: { student_code: score.student_code },
          raw: true,
        })
      ).student_position;
      const newData = { ...score, student_position: studentPosition };
      checkAward(newData);
    }
  } catch (err) {
    console.error(err);
  }
};

//Đọc dữ liệu đầu vào
const upload = async (req, res, next) => {
  const uploadedFiles = req.files;

  try {
    for (const file of uploadedFiles) {
      const wb = XLSX.read(file.buffer, { cellDates: true });
      const ws = wb.Sheets['Sheet1'];
      const dataStudent = XLSX.utils.sheet_to_json(ws);
      for (const rowData of dataStudent) {
        console.log('Chức vu: ' + parseInt(rowData['Chức vụ']));
        try {
          const msv = rowData['Mã SV'];
          const year = rowData['Năm học'];
          const scoreFail = rowData['Số học phần điểm F'] ? parseInt(rowData['Số học phần điểm F']) : 0;
          const dobFormatted = moment(rowData['Ngày sinh'], dateFormat).toDate();
          const scoreBelowCPlus =
            (rowData['Số học phần điểm D+'] ? parseInt(rowData['Số học phần điểm D+']) : 0) +
            (rowData['Số học phần điểm C'] ? parseInt(rowData['Số học phần điểm C']) : 0) +
            (rowData['Số học phần điểm D'] ? parseInt(rowData['Số học phần điểm D']) : 0) +
            scoreFail;

          const [studentInstance, studentCreated] = await db.Student.findOrCreate({
            where: { student_code: msv },
            defaults: {
              student_name: rowData['Họ tên'],
              student_dob: dobFormatted,
              student_position: rowData['Chức vụ'] != null ? true : false,
              class_name: rowData['Lớp'],
              majors_name: rowData['Ngành'],
              faculty_name: rowData['Khoa'],
            },
          });

          const [classInstance, classCreated] = await db.Class.findOrCreate({
            where: { class_name: rowData['Lớp'], majors_name: rowData['Ngành'] },
            default: {},
          });

          const [majorsInstance, majorsCreated] = await db.Majors.findOrCreate({
            where: { majors_name: rowData['Ngành'], faculty_name: rowData['Khoa'] },
            default: {},
          });

          const [facultyInstance, facultyCreated] = await db.Faculty.findOrCreate({
            where: { faculty_name: rowData['Khoa'] },
            default: {},
          });

          const scoreInstance = await db.Score.findOne({
            where: { student_code: msv, year_code: year },
          });

          if (rowData.hasOwnProperty('Xếp loại')) {
            if (scoreInstance) {
              // Nếu bản ghi đã tồn tại, cập nhật trường điểm rèn luyện
              scoreInstance.conduct_score = rowData['Xếp loại'];
              await scoreInstance.save();
            } else {
              const [newScoreInstance, newScoreCreated] = await db.Score.findOrCreate({
                where: { student_code: msv, year_code: year },
                defaults: {
                  conduct_score: rowData['Xếp loại'],
                },
              });
            }
          } else {
            if (scoreInstance) {
              scoreInstance.course_score_hk = parseFloat(rowData.TBCHK);
              scoreInstance.course_score_tl = parseFloat(rowData.TBCTL);
              scoreInstance.score_below_C_plus = scoreBelowCPlus;
              scoreInstance.score_fail = scoreFail;
              await scoreInstance.save();
            } else {
              const [newScoreInstance, newScoreCreated] = await db.Score.findOrCreate({
                where: { student_code: msv, year_code: year },
                defaults: {
                  course_score_hk: parseFloat(rowData.TBCHK),
                  course_score_tl: parseFloat(rowData.TBCTL),
                  score_below_C_plus: scoreBelowCPlus,
                  score_fail: scoreFail,
                },
              });
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
    await processAwards();
    res.status(200).json({ message: 'Nhập dữ liệu thành công' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while processing data' });
  }
};

module.exports = upload;
