module.exports = function gruntJade(grunt) {

  grunt.config('jade', {
    options: {
      client: false,
      pretty: true
    },
    temp: {
      files: [
        { expand: true, cwd: 'views/pages', src: ['./**/*.jade'], dest: '.temp/', ext: '.html' }
      ]
    }
  });

};
