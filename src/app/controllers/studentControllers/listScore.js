const db = require('../../../db/models/index');
const PAGE_SIZE = 10;

const listScore = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * PAGE_SIZE;
  try {
    const { count, rows } = await db.Score.findAndCountAll({
      include: [
        {
          model: db.Student,
          on: {
            col1: db.sequelize.where(db.sequelize.col('Score.student_code'), '=', db.sequelize.col('Student.student_code')),
          },
        },
      ],
      limit: PAGE_SIZE,
      offset,
      raw: true,
    });

    const results = {
      data: rows,
      pagination: {
        page,
        total: count,
      },
    };
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = listScore;
