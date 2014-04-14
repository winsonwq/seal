const PATH = require('path');

module.exports = function gruntStylus (grunt) {

  grunt.config('stylus', {
    temp: {
      files: [{
        expand: true,
        src: 'styles/**/*.styl',
        dest: '.temp/',
        ext: '.css',
        filter: function (filename) {
          return PATH.basename(filename)[0] != '_';
        }
      }]
    }
  });

};
