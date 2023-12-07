const { sequelize } = require('../../../config/connectDB');
const { QueryTypes } = require('sequelize');

const statistics = async (req, res, next) => {
  const year = req.query.year;
  if (year) {
    const svg = (await sequelize.query(`SELECT COUNT(*) as svg FROM award WHERE award_type = 'SVG' and year_code = '${year}'`, { type: QueryTypes.SELECT }))[0].svg;
    const svxs = (await sequelize.query(`SELECT COUNT(*) as svxs FROM award WHERE award_type like '%SVXS%' and year_code = '${year}'`, { type: QueryTypes.SELECT }))[0].svxs;
    const svcdg = (await sequelize.query(`SELECT COUNT(*) as svcdg FROM award WHERE award_type like '%SVCDG%' and year_code = '${year}'`, { type: QueryTypes.SELECT }))[0].svcdg;
    //Khoa CNTT
    const svg_cntt = (
      await sequelize.query(
        `SELECT count(Award.id) as svg_cntt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type = 'SVG' and faculty_name like '%Công nghệ thông tin%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svg_cntt;

    const svxs_cntt = (
      await sequelize.query(
        `SELECT count(Award.id) as svxs_cntt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVXS%' and faculty_name like '%Công nghệ thông tin%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svxs_cntt;

    const svcdg_cntt = (
      await sequelize.query(
        `SELECT count(Award.id) as svcdg_cntt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVCDG%' and faculty_name like '%Công nghệ thông tin%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svcdg_cntt;
    //Khoa DTVT
    const svg_dtvt = (
      await sequelize.query(
        `SELECT count(Award.id) as svg_dtvt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type = 'SVG' and faculty_name like '%Điện tử viễn thông%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svg_dtvt;

    const svxs_dtvt = (
      await sequelize.query(
        `SELECT count(Award.id) as svxs_dtvt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVXS%' and faculty_name like '%Điện tử viễn thông%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svxs_dtvt;

    const svcdg_dtvt = (
      await sequelize.query(
        `SELECT count(Award.id) as svcdg_dtvt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVCDG%' and faculty_name like '%Điện tử viễn thông%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svcdg_dtvt;
    //Khoa VLKT&CNN
    const svg_vlkt = (
      await sequelize.query(
        `SELECT count(Award.id) as svg_vlkt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type = 'SVG' and faculty_name like '%Vật lý kỹ thuật%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svg_vlkt;

    const svxs_vlkt = (
      await sequelize.query(
        `SELECT count(Award.id) as svxs_vlkt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVXS%' and faculty_name like '%Vật lý kỹ thuật%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svxs_vlkt;

    const svcdg_vlkt = (
      await sequelize.query(
        `SELECT count(Award.id) as svcdg_vlkt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVCDG%' and faculty_name like '%Vật lý kỹ thuật%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svcdg_vlkt;
    //Khoa CHKT&TDH
    const svg_chkt = (
      await sequelize.query(
        `SELECT count(Award.id) as svg_chkt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type = 'SVG' and faculty_name like '%Cơ học kỹ thụât%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svg_chkt;

    const svxs_chkt = (
      await sequelize.query(
        `SELECT count(Award.id) as svxs_chkt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVXS%' and faculty_name like '%Cơ học kỹ thụât%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svxs_chkt;

    const svcdg_chkt = (
      await sequelize.query(
        `SELECT count(Award.id) as svcdg_chkt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVCDG%' and faculty_name like '%Cơ học kỹ thụât%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svcdg_chkt;
    //Khoa Công nghệ nông nghiệp
    const svg_cnnn = (
      await sequelize.query(
        `SELECT count(Award.id) as svg_cnnn from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type = 'SVG' and faculty_name like '%Công nghệ Nông nghiệp%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svg_cnnn;

    const svxs_cnnn = (
      await sequelize.query(
        `SELECT count(Award.id) as svxs_cnnn from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVXS%' and faculty_name like '%Công nghệ Nông nghiệp%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svxs_cnnn;

    const svcdg_cnnn = (
      await sequelize.query(
        `SELECT count(Award.id) as svcdg_cnnn from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVCDG%' and faculty_name like '%Công nghệ Nông nghiệp%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svcdg_cnnn;
    //Khoa Công nghệ xây dựng và giao thông
    const svg_cnxd = (
      await sequelize.query(
        `SELECT count(Award.id) as svg_cnxd from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type = 'SVG' and faculty_name like '%Công nghệ Xây dựng%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svg_cnxd;

    const svxs_cnxd = (
      await sequelize.query(
        `SELECT count(Award.id) as svxs_cnxd from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVXS%' and faculty_name like '%CCông nghệ Xây dựng%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svxs_cnxd;

    const svcdg_cnxd = (
      await sequelize.query(
        `SELECT count(Award.id) as svcdg_cnxd from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVCDG%' and faculty_name like '%Công nghệ Xây dựng%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svcdg_cnxd;
    //Viện công nghệ hàng không vũ trụ
    const svg_cnhkvt = (
      await sequelize.query(
        `SELECT count(Award.id) as svg_cnhkvt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type = 'SVG' and faculty_name like '%Công nghệ Hàng không Vũ trụ%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svg_cnhkvt;

    const svxs_cnhkvt = (
      await sequelize.query(
        `SELECT count(Award.id) as svxs_cnhkvt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVXS%' and faculty_name like '%Công nghệ Hàng không Vũ trụ%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svxs_cnhkvt;

    const svcdg_cnhkvt = (
      await sequelize.query(
        `SELECT count(Award.id) as svcdg_cnhkvt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVCDG%' and faculty_name like '%Công nghệ Hàng không Vũ trụ%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svcdg_cnhkvt;
    //Viện tiên tiến về kỹ thuật và Công nghệ
    const svg_ttvkt = (
      await sequelize.query(
        `SELECT count(Award.id) as svg_ttvkt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type = 'SVG' and faculty_name like '%Tiên tiến về Kỹ thuật và Công nghệ%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svg_ttvkt;

    const svxs_ttvkt = (
      await sequelize.query(
        `SELECT count(Award.id) as svxs_ttvkt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVXS%' and faculty_name like '%Tiên tiến về Kỹ thuật và Công nghệ%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svxs_ttvkt;

    const svcdg_ttvkt = (
      await sequelize.query(
        `SELECT count(Award.id) as svcdg_ttvkt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVCDG%' and faculty_name like '%Tiên tiến về Kỹ thuật và Công nghệ%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svcdg_ttvkt;
    //Viện trí tuệ nhân tạo
    const svg_ttnt = (
      await sequelize.query(
        `SELECT count(Award.id) as svg_ttnt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type = 'SVG' and faculty_name like '%Trí tuệ nhân tạo%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svg_ttnt;

    const svxs_ttnt = (
      await sequelize.query(
        `SELECT count(Award.id) as svxs_ttnt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVXS%' and faculty_name like '%Trí tuệ nhân tạo%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svxs_ttnt;

    const svcdg_ttnt = (
      await sequelize.query(
        `SELECT count(Award.id) as svcdg_ttnt from Award as Award inner join Student as Student on Award.student_code = Student.student_code WHERE award_type like '%SVCDG%' and faculty_name like '%Trí tuệ nhân tạo%' and year_code = '${year}'`,
        { type: QueryTypes.SELECT },
      )
    )[0].svcdg_ttnt;

    const results = [
      {
        svg,
        svxs,
        svcdg,

        svg_cntt,
        svxs_cntt,
        svcdg_cntt,

        svg_dtvt,
        svxs_dtvt,
        svcdg_dtvt,

        svg_vlkt,
        svxs_vlkt,
        svcdg_vlkt,

        svg_chkt,
        svxs_chkt,
        svcdg_chkt,

        svg_cnnn,
        svxs_cnnn,
        svcdg_cnnn,

        svg_cnxd,
        svxs_cnxd,
        svcdg_cnxd,

        svg_cnhkvt,
        svxs_cnhkvt,
        svcdg_cnhkvt,

        svg_ttvkt,
        svxs_ttvkt,
        svcdg_ttvkt,

        svg_ttnt,
        svxs_ttnt,
        svcdg_ttnt,
      },
    ];
    res.status(201).json(results);
  }
};
module.exports = statistics;
