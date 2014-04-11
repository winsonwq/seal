module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    buildPath: 'public',
    devPath: 'dev',
    clean: ['<%=buildPath%>', '<%=devPath%>', '.tmp', '.temp'],
    jade: {
      options: {
        client: false
      },
      temp: {
        src: ['views/index.jade'],
        dest: '.temp',
        options: {
          pretty: true
        }
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
          port: 9002,
          base: ['public', 'bower_components'],
          keepalive: true
        }
      }
    },
    watch: {
      views: {
        files: ['views/**/*.jade'],
        tasks: ['jade:dev'],
        options: {
          livereload: 35729
        }
      },
      styles: {
        files: ['styles/**/*.styl'],
        tasks: ['stylus:dev'],
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
        files: {
          '.temp/styles/index.css': 'styles/index.styl',
          '.temp/styles/components/header.css': 'styles/components/header.styl',
          '.temp/styles/components/agent.css': 'styles/components/agent.styl',
          '.temp/styles/components/resource.css': 'styles/components/resource.styl'
        }
      }
    },
    useminPrepare: {
      build: {
        src: '.temp/index.html',
        options: {
          dest: '.temp'
        }
      }
    },
    usemin: {
      html: '.temp/index.html'
    },
    copy: {
      dev: {
        files: [
          { expand: true, cwd: '.temp', src : './styles/**', dest: 'dev/'},
          { expand: true, src : 'scripts/**', dest: 'dev/'},
          { src : '.temp/index.html', dest: 'dev/index.html' }
        ]
      },
      build: {
        files: [
          { src : '.temp/styles/main.css', dest: 'public/styles/main.css'},
          { src : '.temp/scripts/index.js', dest: 'public/scripts/index.js'},
          { src : '.temp/index.html', dest: 'public/index.html' }
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
    'copy:build',
    'connect:build'
  ]);
};
