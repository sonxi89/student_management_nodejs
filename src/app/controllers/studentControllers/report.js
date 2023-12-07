const Sequelize = require('sequelize');
const db = require('../../../db/models/index');

const PAGE_SIZE = 10;
const { QueryTypes } = require('sequelize');
const sequelize = new Sequelize('sonnguyenthai2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const report = async (req, res, next) => {
  try {
    const sum_svg = await db.Award.count({
      where: {
        award_type: 'SVG',
      },
    });

    const sum_svxs = await db.Award.count({
      where: {
        award_type: 'SVXS',
      },
    });

    const sum_svcdg = await db.Award.count({
      where: {
        award_type: 'SVCDG',
      },
    });

    const sum_svxsvcdg = await db.Award.count({
      where: {
        award_type: 'SVXS, SVCDG',
      },
    });

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
