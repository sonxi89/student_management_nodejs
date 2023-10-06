const db = require('../../../db/models/index');

const list = async (req, res, next) => {
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
};

module.exports = list;
