module.exports = function gruntWatch (grunt) {
  grunt.config('watch', {
    devAssets: {
      files: ['views/**/*.jade', 'styles/**/*.styl', 'scripts/**/*.js'],
      tasks: ['jade:temp', 'stylus:temp', 'copy:js2temp', 'copy:dev'],
      options: {
        livereload: 35729
      }
    }
  });
};
