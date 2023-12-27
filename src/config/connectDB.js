const { Sequelize } = require('sequelize');

// 'sonnguyenthai2', 'root',
const sequelize = new Sequelize({
  database: 'sonnguyenthai2',
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  username: 'root',
  password: 'root',
  // password: null,
  define: {
    freezeTableName: true,
  },
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  sequelize,
  connectDB,
};
