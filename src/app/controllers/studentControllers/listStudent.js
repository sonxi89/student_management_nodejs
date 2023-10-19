const db = require('../../../db/models/index');
const PAGE_SIZE = 10;

const listStudent = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * PAGE_SIZE;

  try {
    const { count, rows } = await db.Student.findAndCountAll({
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = listStudent;
