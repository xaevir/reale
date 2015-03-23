'use strict';

/**
 * Environment variables and application configuration.
 */

var path = require('path'),
  _ = require('lodash');

var baseConfig = {
  app: {
    root: path.normalize(__dirname + '/../..'),
    env: process.env.NODE_ENV
  }
};

// environment specific config overrides
var platformConfig = {
  development: {
    app: {
      port: 3000,
      staticPath: 'app',
      cacheTime: 0
    }
  },

  test: {
    app: {
      port: 3001,
      staticPath: 'app',
      cacheTime: 0
    }
  },

  production: {
    app: {
      port: process.env.PORT || 3000,
      staticPath: 'dist',
      cacheTime: 7 * 24 * 60 * 60 * 1000 /* default caching time (7 days) */
    },
    mongo: {
      url: ''
    }
  }
};

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig,
  platformConfig[baseConfig.app.env ||
  (baseConfig.app.env = 'development')]);
