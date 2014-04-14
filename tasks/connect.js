module.exports = function gruntConnect (grunt) {
  grunt.config('connect', {
    dev: {
      options: {
        port: 9001,
        base: ['dev', 'bower_components'],
        livereload: 35729,
        keepalive: true
      }
    },
    build: {
      options: {
        port: 9001,
        base: ['public', 'bower_components'],
        keepalive: true
      }
    }
  });
};
