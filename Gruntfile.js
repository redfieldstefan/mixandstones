module.exports = function(grunt) {
    'use strict';
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    var jsToLint = [
        'models/**/*.js',
        'test/**/*.js',
        'routes/**/*.js',
        'server.js',
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            all: {
                src: [
                    'dist/'
                ]
            }
        },
        copy: {
            all: {
                expand: true,
                cwd: 'app/',
                src: [
                    '*.*',
                    '**/*.*',
                ],
                dest: 'dist/',
                filter: 'isFile'
            }
        },
        jshint: {
            files: jsToLint,
            options: {
                'jshintrc': true
            }
        },
        jscs: {
            src: jsToLint
        },
        sass: {
            build: {
                files: {
                    'app/css/style.css': 'app/css/scss/style.scss'
                }
            }
        },
        // browserify: {
        //     options: {
        //         debug: true,
        //         transform: [ 'reactify', 'debowerify' ],
        //         extensions: [ '.jsx' ],
        //     },
        //     dev: {
        //         src: [ 'app/js/app.js' ],
        //         dest: 'dist/scripts.js'
        //     }
        // },
        express: {
            dev: {
                options: {
                    script: 'server.js',
                    background: true // Runs in the background, so we can set up a watch task!
                }
            }
        },
        watch: {
            all: {
                files: [
                    'app/*.*',
                    'app/**/*.*'
                ],
                tasks: [
                    'sass',
                    'clean',
                    'copy',
                    'browserify:dev'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'jscs',
        'sass',
        'clean',
        'copy',
        // 'browserify:dev',
        'express:dev',
        'watch'
    ]);
};