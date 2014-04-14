module.exports = function gruntMochaTest (grunt) {

  grunt.config('mochaTest', {
    unit: {
      options: {
        reporter: 'spec'
      },
      src: ['test/unit/**/*.js']
    }
  });

  grunt.registerTask('mocha', ['mochaTest:unit']);

};
