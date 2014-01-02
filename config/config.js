var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    mongoConfig = require('./mongoConfig'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'Codesnipz'
    },
    port: 3000
  },

  test: {
    root: rootPath,
    app: {
      name: 'Codesnipz'
    },
    port: 3000
  },

  production : {
    root: rootPath,
    port: process.env.PORT || 5000
  }
};

module.exports = config[env];
