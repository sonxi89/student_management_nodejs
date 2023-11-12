const studentRoute = require('./student');
const siteRouter = require('./site');
const authRouter = require('./auth');

function route(app) {
  app.use('/', siteRouter);
  app.use('/auth', authRouter);
  app.use('/student', studentRoute);
}

module.exports = route;
