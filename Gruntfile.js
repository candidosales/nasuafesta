module.exports = function(grunt) {

    // 1. load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);    

    // 2. All configuration goes here 
    grunt.initConfig({
       sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/style.min.css': 'dev/scss/app.scss'
                }
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                    'dist/css/style.css': 'dev/scss/app.scss'
                }
            } 
        },
        uncss: {
          dist: {
            files: {
              'dist/css/used.scss': ['dist/index.html',
                                     'dist/clients.html',
                                     'dist/finance.html',
                                     'dist/accounts-payable.html',
                                     'dist/accounts-receivable.html',
                                     'dist/finance.html']
            }
          }
        },
        concat: {
          dist: {
            src: ['dev/js/jquery-1.10.2.min.js',
                  'dev/js/jquery.easing.1.3.js', 
                  'dev/js/jquery.parallax-1.1.3.js',
                  'dev/js/jquery.localscroll-1.2.7-min.js',
                  'dev/js/jquery.scrollTo-1.4.2-min.js',
                  'dev/js/jquery.flexisel.js',
                  'dev/js/jquery.prettyPhoto.js',
                  'dev/js/main.js',
                  'dev/js/bootstrap.min.js'],
            dest: 'dist/js/main.js',
          },
        },
        uglify: {
          dev: {
            files: {
              'dist/js/main.min.js': ['dist/js/main.js']
            }
          }
        },
        imagemin: {
          dynamic: {                         // Another target
            files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: 'dev/img/',                   // Src matches are relative to this path
              src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'dist/img/'                  // Destination path prefix
            }]
          }
        },
        watch: {
          options: {
            livereload: true,
          },
          css: {
            files: 'dev/scss/**/*.scss',
            tasks: ['sass:dev'],
            
          },
          img: {
            files: 'dev/img/**/*.{png,jpg,gif}',
            tasks: ['imagemin'],
          },
          js: {
            files: 'dev/js/**/*.js',
            tasks:['concat']
          },
        },
        connect: {
          server: {
            options: {
              port: 8000,
              base: './'
            }
          }
        }
    });

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass:dev']);

    grunt.registerTask('dev', ['connect', 'watch']);

    grunt.registerTask('doc', ['connect', 'watch:doc']);

    grunt.registerTask('prod-uncss', ['uncss', 'sass:dist']);

};

