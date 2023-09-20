const studentRoute = require('./student');

function route(app) {
  app.use('/student', studentRoute);
}

module.exports = route;
