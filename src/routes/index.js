const apiRoute = require('./api');

function route(app) {
  app.use('/', apiRoute);
}

module.exports = route;
