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
          'css': [
            { name: 'concat', createConfig: concat },
            { name: 'cssmin', createConfig: minify }
          ],
          'js': [
            { name: 'concat', createConfig: concat },
            { name: 'uglify', createConfig: minify }
          ]
        }
      }
    }
  });

  function lastGenerated (context) {
    var generated = context.options.generated;
    var last = generated.files.length - 1;
    return generated.files[last];
  }

  function concat (context, block) {
    lastGenerated(context).dest = PATH.resolve(context.inDir, block.dest);
  }

  function minify (context, block) {
    lastGenerated(context).src = lastGenerated(context).dest = PATH.resolve(context.inDir, block.dest);
  }

};
