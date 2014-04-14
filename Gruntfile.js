var PATH = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    buildPath: 'public',
    devPath: 'dev'
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadTasks('tasks');

  grunt.registerTask('dev', [
    'clean',
    'jade:temp',
    'stylus:temp',
    'copy:dev',
    'concurrent:dev'
  ]);

  grunt.registerTask('build', [
    'clean',
    'jade:temp',
    'stylus:temp',
    'copy:js2temp',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'usemin',
    'copy:build'
  ]);
};
