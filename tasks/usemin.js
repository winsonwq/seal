module.exports = function gruntUsemin (grunt) {

  grunt.config('usemin', {
    html: '.temp/pages/**/*.html'
  });

  grunt.config('useminPrepare', {
    build: {
      src: '.temp/pages/**/*.html',
      options: {
        dest: '.temp',
        root: '.temp'
      }
    }
  });

};
