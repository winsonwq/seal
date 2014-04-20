module.exports = function gruntJade(grunt) {

  grunt.config('jade', {
    options: {
      client: false,
      pretty: true
    },
    temp: {
      files: [
        { expand: true, cwd: 'views/', src: ['./pages/**/*.jade'], dest: '.temp/', ext: '.html' }
      ]
    }
  });

};
