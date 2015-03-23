'use strict';

var fs = require('fs'),
    logger = require('koa-logger'),
    send = require('koa-send'),
    config = require('./config');

module.exports = function (app) {
  // middleware configuration
  if (config.app.env !== 'test') {
    app.use(logger());
  }

  // register special controllers which should come
  // before any jwt token check and be publicly accessible
  //require('../controllers/public').init(app);
  //require('../controllers/signin').init(app);

  var staticFileSendOpts = {
    root: config.app.staticPath,
    maxage: config.app.cacheTime
  };

  app.use(function *(next) {
    // do not handle /api paths
    if (this.path.substr(0, 5).toLowerCase() === '/api/') {
      yield next;
      return;
    } else if (yield send(this, this.path, staticFileSendOpts)) {
      // file exists and request successfully served so do nothing
      return;
    } else if (this.path.indexOf('.') !== -1) {
      // file does not exist so do nothing and koa will return 404 by default
      // we treat any path with a dot '.' in it as a request for a file
      return;
    } else {
      // request is for a subdirectory so treat it as an angular route
      // and serve index.html, letting angular handle the routing properly
      yield send(this, '/index.html', staticFileSendOpts);
    }
  });

};
