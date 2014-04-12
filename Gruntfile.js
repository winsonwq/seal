var PATH = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    buildPath: 'public',
    devPath: 'dev',
    clean: ['<%=buildPath%>', '<%=devPath%>', '.tmp', '.temp'],
    jade: {
      options: {
        client: false,
        pretty: true
      },
      temp: {
        files: [
          { expand: true, cwd: 'views/', src: ['./pages/page*/index.jade'], dest: '.temp/', ext: '.html' }
        ]
      }
    },
    connect: {
      dev: {
        options: {
          port: 9001,
          base: ['dev', 'bower_components'],
          livereload: 35729,
          keepalive: true
        }
      },
      build: {
        options: {
          port: 9001,
          base: ['public', 'bower_components'],
          keepalive: true
        }
      }
    },
    watch: {
      devAssets: {
        files: ['views/**/*.jade', 'styles/**/*.styl', 'scripts/**/*.js'],
        tasks: ['jade:temp', 'stylus:temp', 'copy:js2temp', 'copy:dev'],
        options: {
          livereload: 35729
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch', 'connect:dev']
      }
    },
    stylus: {
      temp: {
        files: [{
          expand: true,
          src: 'styles/**/*.styl',
          dest: '.temp/',
          ext: '.css',
          filter: function (filename) {;
            return PATH.basename(filename)[0] != '_';
          }
        }]
      }
    },
    useminPrepare: {
      build: {
        src: '.temp/pages/**/*.html',
        options: {
          dest: '.temp',
          root: '.temp'
        }
      }
    },
    usemin: {
      html: '.temp/pages/**/*.html'
    },
    copy: {
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
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('dev', [
    'clean',
    'jade:temp',
    'stylus:temp',
    'copy:dev',
    'concurrent:dev'
  ]);

  grunt.registerTask('build', [
    'clean',
    'jade:temp',
    'stylus:temp',
    'copy:js2temp',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'usemin',
    'copy:build'
  ]);
};
