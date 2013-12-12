'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
    }
  },

watch: {
  options: {
    nospawn: true,
    livereload: reloadPort
  },
  js: {
      files: [
      'app.js',
      'app/**/*.js',
      'config/*.js',
      'public/js/*.js',
      'public/partials/*.html'
      ],
      tasks: ['develop', 'delayed-livereload']
  },
  css: {
      files: [
      'public/css/*'
      ],
      tasks: ['less']
  },
  ejs: {
      files: ['app/views/**/*.ejs'],
      options: { livereload: reloadPort }
  }
},

less: {
    development: {
        options: {
            paths: ["public/css"]
        },
        files: {
           "public/css/desktop-result.css": "public/css/desktop.less"
       }
   },
   production: {
            // options: {
            //     paths: ["assets/css"],
            //     yuicompress: true
            // },
            // files: {
            //     "path/to/result.css": "path/to/source.less"
            // }
        }
    },
    jshint: {
        files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js', 'server/*.js'],
        options: {
            globals: {
                jQuery: true,
                console: false,
                module: true,
                document: true
            }
        }
    }
});

grunt.config.requires('watch.js.files');
grunt.config.requires('watch.css.files');
files = grunt.config('watch.js.files');
files = grunt.file.expand(files);

grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
        else
            grunt.log.error('Unable to make a delayed live reload.');
        done(reloaded);
    });
  }, 500);
});

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.registerTask('default', ['develop', 'watch']);
};
