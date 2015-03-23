'use strict';

var config = require('./server/config/config'),
  koaConfig = require('./server/config/koa'),
  koa = require('koa'),
  app = koa();

module.exports = app;

koaConfig(app);

app.server = app.listen(config.app.port);
if (config.app.env !== 'test') {
  console.log('koa listening on port ' + config.app.port);
}
