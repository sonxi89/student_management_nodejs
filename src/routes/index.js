const studentRoute = require('./student');
const siteRouter = require('./site');

function route(app) {
  app.use('/', siteRouter);
  app.use('/student', studentRoute);
}

module.exports = route;
