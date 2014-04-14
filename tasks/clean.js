module.exports = function gruntClean (grunt) {
  grunt.config('clean', ['<%=buildPath%>', '<%=devPath%>', '.tmp', '.temp']);
};
