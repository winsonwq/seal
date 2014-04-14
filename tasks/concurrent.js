module.exports = function gruntConcurrent (grunt) {
  grunt.config('concurrent', {
    dev: {
      tasks: ['watch', 'connect:dev']
    }
  });
};
