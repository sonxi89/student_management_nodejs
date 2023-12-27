const Sequelize = require('sequelize');
const db = require('../../../db/models/index');
const { sequelize } = require('../../../config/connectDB');

const { QueryTypes } = require('sequelize');

const report = async (req, res, next) => {
  try {
    const sum_svg = await db.Award.count({
      where: {
        award_type: 'SVG',
      },
    });

    const sum_svxs = (await sequelize.query(`SELECT count(Award.id) as svxs from Award as Award  WHERE award_type like '%SVXS%'`, { type: QueryTypes.SELECT }))[0].svxs;

    const sum_svcdg = (await sequelize.query(`SELECT count(Award.id) as svcdg from Award as Award  WHERE award_type like '%SVCDG%'`, { type: QueryTypes.SELECT }))[0].svcdg;
    const sum_svxsvcdg = (await sequelize.query(`SELECT count(Award.id) as svxsvcdg from Award as Award  WHERE award_type like '%SVXS, SVCDG%'`, { type: QueryTypes.SELECT }))[0].svxsvcdg;
    res.json({
      svg: sum_svg,
      svxs: sum_svxs,
      svcdg: sum_svcdg,
      svxsvcdg: sum_svxsvcdg,
    });
  } catch (e) {
    console.error('get report error: ', e);
    res.json({
      error: 'some thing went wrong',
    });
  }
};
module.exports = report;
