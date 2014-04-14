module.exports = function gruntCopy(grunt) {

  grunt.config('copy', {
    dev: {
      files: [
        { expand: true, cwd: '.temp', src : './styles/**', dest: 'dev/'},
        { expand: true, src : 'scripts/**', dest: 'dev/'},
        { expand: true, cwd: '.temp', src : './pages/**', dest: 'dev/'}
      ]
    },
    build: {
      files: [
        {
          expand: true,
          cwd: '.temp',
          src : ['./styles/**/*.css', './scripts/**/*.js'],
          dest: './public',
          filter: function (filename) {
            return filename.indexOf('.min.') != -1;
          }
        },
        { expand: true, cwd: '.temp', src : './pages/**', dest: 'public/'}
      ]
    },
    js2temp: {
      expand: true, src : 'scripts/**', dest: '.temp/'
    }
  });

};
