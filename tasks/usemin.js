module.exports = function gruntUsemin (grunt) {

  var PATH = require('path');

  grunt.config('usemin', {
    html: '.temp/**/*.html'
  });

  grunt.config('useminPrepare', {
    build: {
      files: [{ src: '.temp/**/*.html' }]
    },
    options: {
      // destination folder
      dest: '.temp',
      flow: {
        steps: {'css': ['concat', 'cssmin'], 'js' : ['concat', 'uglifyjs'] },
        post: {
          'css': [{
            name: 'concat',
            createConfig: function (context, block) {
              var generated = context.options.generated;
              generated.files[0].dest = PATH.resolve(context.inDir, block.dest);
            }
          }, {
            name: 'cssmin',
            createConfig: function (context, block) {
              var generated = context.options.generated;
              generated.files[0].src = generated.files[0].dest = PATH.resolve(context.inDir, block.dest);
            }
          }],
          'js': [{
            name: 'concat',
            createConfig: function(context, block) {
              context.options.generated.files[1].dest = PATH.resolve(context.inDir, block.dest);
            }
          }, {
            name: 'uglify',
            createConfig: function (context, block) {
              var generated = context.options.generated;
              generated.files[0].src = generated.files[0].dest = PATH.resolve(context.inDir, block.dest);
            }
          }]
        }
      }
    }
  });

};
