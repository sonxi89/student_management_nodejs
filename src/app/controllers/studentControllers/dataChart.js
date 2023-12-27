const { sequelize } = require('../../../config/connectDB');
const { QueryTypes } = require('sequelize');

const dataChart = async (req, res, next) => {
  //2021-2022
  const svg_1 = (await sequelize.query(`SELECT count(Award.id) as svg_1 from Award as Award  WHERE award_type = 'SVG' and year_code = '2021-2022'`, { type: QueryTypes.SELECT }))[0].svg_1;

  const svxs_1 = (await sequelize.query(`SELECT count(Award.id) as svxs_1 from Award as Award  WHERE award_type like '%SVXS%' and year_code = '2021-2022'`, { type: QueryTypes.SELECT }))[0].svxs_1;

  const svcdg_1 = (await sequelize.query(`SELECT count(Award.id) as svcdg_1 from Award as Award  WHERE award_type like '%SVCDG%' and year_code = '2021-2022'`, { type: QueryTypes.SELECT }))[0].svcdg_1;

  //2022-2022
  const svg_2 = (await sequelize.query(`SELECT count(Award.id) as svg_2 from Award as Award  WHERE award_type = 'SVG' and year_code = '2022-2023'`, { type: QueryTypes.SELECT }))[0].svg_2;

  const svxs_2 = (await sequelize.query(`SELECT count(Award.id) as svxs_2 from Award as Award  WHERE award_type like '%SVXS%' and year_code = '2022-2023'`, { type: QueryTypes.SELECT }))[0].svxs_2;

  const svcdg_2 = (await sequelize.query(`SELECT count(Award.id) as svcdg_2 from Award as Award  WHERE award_type like '%SVCDG%' and year_code = '2022-2023'`, { type: QueryTypes.SELECT }))[0].svcdg_2;

  //2023-2024
  const svg_3 = (await sequelize.query(`SELECT count(Award.id) as svg_3 from Award as Award  WHERE award_type = 'SVG' and year_code = '2023-2024'`, { type: QueryTypes.SELECT }))[0].svg_3;

  const svxs_3 = (await sequelize.query(`SELECT count(Award.id) as svxs_3 from Award as Award  WHERE award_type like '%SVXS%' and year_code = '2023-2024'`, { type: QueryTypes.SELECT }))[0].svxs_3;

  const svcdg_3 = (await sequelize.query(`SELECT count(Award.id) as svcdg_3 from Award as Award  WHERE award_type like '%SVCDG%' and year_code = '2023-2024'`, { type: QueryTypes.SELECT }))[0].svcdg_3;

  const results = [
    {
      name: '2021-2022',
      SVG: svg_1,
      SVXS: svxs_1,
      SVCĐG: svcdg_1,
    },
    {
      name: '2022-2023',
      SVG: svg_2,
      SVXS: svxs_2,
      SVCĐG: svcdg_2,
    },
    {
      name: '2023-2024',
      SVG: svg_3,
      SVXS: svxs_3,
      SVCĐG: svcdg_3,
    },
  ];
  res.status(201).json(results);
};

module.exports = dataChart;
