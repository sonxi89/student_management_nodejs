const faculty = require('../../../db/models/faculty');
const db = require('../../../db/models/index');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('sonnguyenthai2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
const PAGE_SIZE = 10;

const statistics = async (req, res, next) => {
  const year = req.query.year;
  let results = {};
  let faculties = [];
  let majors = [];
  let classes = [];

  const award_types = [
    {
      code: 'SVXS',
      name: 'SVXS',
    },
    {
      code: 'SVG',
      name: 'SVG',
    },
    {
      code: 'SVCDG',
      name: 'SVCĐG',
    },
    {
      code: 'SVXSVCDG',
      name: 'SVXS, SVCĐG',
    },
  ];
  faculties = await sequelize.query('select distinct faculty_code from facultys f', { type: Sequelize.QueryTypes.SELECT });

  results = {
    SVG: 113123,
    SVXS: 1123123,
    faculties,
  };

  // them nganh vao khoa
  majors_all = [];
  for (let i = 0; i < faculties.length; i++) {
    majors = await sequelize.query(`select distinct majors_code from majors m where faculty_code LIKE '${faculties[i].faculty_code}'`, { type: Sequelize.QueryTypes.SELECT });

    faculties[i] = {
      SVG: 11,
      SVXS: 11,
      faculty_code: faculties[i].faculty_code,
      majors,
    };
    for (let i = 0; i < majors.length; i++) {
      majors_all.push(majors[i]);
    }
  }

  // them lop vao nganh
  for (let i = 0; i < majors_all.length; i++) {
    classes = await sequelize.query(`select distinct class_code from classs c where majors_code LIKE '${majors_all[i].majors_code}'`, { type: Sequelize.QueryTypes.SELECT });

    for (let i = 0; i < classes.length; i++) {
      let querystring = ' SELECT NULL ';
      for (let award_type of award_types) {
        querystring += ` ,SUM(CASE WHEN award_type like '${award_type.name}' AND Student.class LIKE '${classes[i].class_code}' THEN 1 ELSE 0 END) AS '${award_type.code}' `;
      }
      querystring += ` FROM Awards AS Award INNER JOIN Students AS Student ON Award.student_code = Student.student_code WHERE Award.year_code = '${year}'`;
      const db_result = await sequelize.query(querystring, { type: Sequelize.QueryTypes.SELECT });
      classes[i] = {
        ...classes[i],
        statistics: db_result,
      };
    }

    majors_all[i] = {
      SVG: 12,
      SVXS: 12,
      majors_code: majors_all[i].majors_code,
      classes,
    };
  }

  // update majors list
  major_count = 0;
  faculty_count = 0;
  daduyet = 0;
  for (let i = 0; i < majors_all.length; i++) {
    if (i - daduyet == faculties[faculty_count].majors.length) {
      daduyet = i;
      faculty_count++;
      major_count = 0;
    }
    faculties[faculty_count].majors[major_count] = majors_all[i];
    major_count++;
  }

  results = {
    ...results,
    faculties,
  };

  // Thong ke sinh vien

  // Thong ke sinh vien ca truong theo nam:
  let total_svxs_year = 0;
  let total_svg_year = 0;
  let total_svcdg_year = 0;
  let total_svxsvcdg_year = 0;

  //thong ke cua khoa
  for (let c_fa = 0; c_fa < results.faculties.length; c_fa++) {
    let total_svxs_faculties = 0;
    let total_svg_faculties = 0;
    let total_svcdg_faculties = 0;
    let total_svxsvcdg_faculties = 0;
    if (results.faculties[c_fa].majors.length > 0) {
      // thong ke cua nganh
      for (let c_ma = 0; c_ma < results.faculties[c_fa].majors.length; c_ma++) {
        let total_svxs_majors = 0;
        let total_svg_majors = 0;
        let total_svcdg_majors = 0;
        let total_svxsvcdg_majors = 0;
        if (results.faculties[c_fa].majors[c_ma].classes.length > 0) {
          for (let c_cl = 0; c_cl < results.faculties[c_fa].majors[c_ma].classes.length; c_cl++) {
            total_svxs_majors += parseInt(results.faculties[c_fa].majors[c_ma].classes[c_cl].statistics[0].SVXS);
            total_svg_majors += parseInt(results.faculties[c_fa].majors[c_ma].classes[c_cl].statistics[0].SVG);
            total_svcdg_majors += parseInt(results.faculties[c_fa].majors[c_ma].classes[c_cl].statistics[0].SVCDG);
            total_svxsvcdg_majors += parseInt(results.faculties[c_fa].majors[c_ma].classes[c_cl].statistics[0].SVXSVCDG);
          }
        }
        // update statisics vao nganh
        results.faculties[c_fa].majors[c_ma] = {
          ...results.faculties[c_fa].majors[c_ma],
          SVXS: total_svxs_majors,
          SVG: total_svg_majors,
          SVCDG: total_svcdg_majors,
          SVXSVCDG: total_svxsvcdg_majors,
        };

        // tinh tong cua khoa
        total_svxs_faculties += parseInt(total_svxs_majors);
        total_svg_faculties += parseInt(total_svg_majors);
        total_svcdg_faculties += parseInt(total_svcdg_majors);
        total_svxsvcdg_faculties += parseInt(total_svxsvcdg_majors);
      }
    }

    // update statistics vao khoa
    results.faculties[c_fa] = {
      ...results.faculties[c_fa],
      SVXS: total_svxs_faculties,
      SVG: total_svg_faculties,
      SVCDG: total_svcdg_faculties,
      SVXSVCDG: total_svxsvcdg_faculties,
    };

    // tinh tong theo nam
    total_svxs_year += parseInt(total_svxs_faculties);
    total_svg_year += parseInt(total_svg_faculties);
    total_svcdg_year += parseInt(total_svcdg_faculties);
    total_svxsvcdg_year += parseInt(total_svxsvcdg_faculties);
  }

  // update statistics vao ca truong theo nam
  results = {
    ...results,
    SVXS: total_svxs_year,
    SVG: total_svg_year,
    SVCDG: total_svcdg_year,
    SVXSVCDG: total_svxsvcdg_year,
  };

  // // append theo nam hoc
  // for (let award_type of award_types) {
  //   querystring += ` ,SUM(CASE WHEN award_type like '${award_type}' THEN 1 ELSE 0 END) AS 'count_${award_type}' `;
  // }
  // querystring += ` FROM Awards AS Award INNER JOIN Students AS Student ON Award.student_code = Student.student_code WHERE Award.year_code = '${year}'`;
  // let result_nam = (await sequelize.query(querystring, { type: Sequelize.QueryTypes.SELECT }))[0];
  // result_nam = {
  //   ...result_nam,
  //   year_name: year,
  //   faculties: [],
  // };

  // // append theo khoa
  // for (let i = 0; i < faculties.length; i++) {
  //   let querystring = ' SELECT null';
  //   for (let award_type of award_types) {
  //     querystring += ` ,SUM(CASE WHEN award_type like '${award_type}' AND Student.faculty LIKE '${faculties[i].faculty}' THEN 1 ELSE 0 END) AS 'count_${faculties[i].faculty}_${award_type}' `;
  //   }
  //   querystring += ` FROM Awards AS Award INNER JOIN Students AS Student ON Award.student_code = Student.student_code WHERE Award.year_code = '${year}'`;
  //   let result_faculty = (await sequelize.query(querystring, { type: Sequelize.QueryTypes.SELECT }))[0];
  //   result_nam.faculties.push({
  //     ...result_faculty,
  //     faculty_name: faculties[i].faculty,
  //   });
  // }

  // // append theo nganh
  // for (let i = 0; i < majors.length; i++) {
  //   let querystring = ' SELECT null';
  //   for (let award_type of award_types) {
  //     querystring += ` ,SUM(CASE WHEN award_type like '${award_type}' AND Student.majors LIKE '${majors[i].majors}' THEN 1 ELSE 0 END) AS 'count_${majors[i].majors}_${award_type}' `;
  //   }
  //   querystring += ` FROM Awards AS Award INNER JOIN Students AS Student ON Award.student_code = Student.student_code WHERE Award.year_code = '${year}'`;
  //   let result_majors = (await sequelize.query(querystring, { type: Sequelize.QueryTypes.SELECT }))[0];
  //   result_nam.faculties.push({
  //     ...result_faculty,
  //     faculty_name: faculties[i].faculty,
  //   });
  // }

  // results.push(result_nam);

  // // append theo lop
  // for (let lop of classes) {
  //   for (let award_type of award_types) {
  //     querystring += ` ,SUM(CASE WHEN award_type like '${award_type}' AND Student.class LIKE '${lop.class}' THEN 1 ELSE 0 END) AS 'count_${lop.class}_${award_type}' `;
  //   }
  // }
  // querystring += ` FROM Awards AS Award INNER JOIN Students AS Student ON Award.student_code = Student.student_code WHERE Award.year_code = '2021-2022'`;
  // const results = await sequelize.query(querystring, { type: Sequelize.QueryTypes.SELECT });

  //   const results_faculty = await db.Award.findAll({
  //     where: {
  //       year_code: year,
  //     },
  //     include: [
  //       {
  //         model: db.Student,
  //         required: true,
  //         on: {
  //           col1: db.sequelize.where(db.sequelize.col('Award.student_code'), '=', db.sequelize.col('Student.student_code')),
  //         },
  //         attributes: [[Sequelize.fn('COUNT', Sequelize.literal("CASE WHEN faculty = 'Khoa Công nghệ thông tin' THEN 1 END")), 'count_CNTT']],
  //       },
  //     ],
  //     raw: true,
  //     nested: true,
  //   });

  res.json(results);
};
module.exports = statistics;
