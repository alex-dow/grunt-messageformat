/**
 * grunt-messageformat
 * http://github.com/alex-dow/grunt-messageformat
 *
 * Copyright (c) 2015 Alex Dowgailenko, contributors
 * Licensed under the MIT License
 */

'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        clean: {
          tmp: {
            src: ['tmp/']
          }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/**/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        jscs: {
            src: ['tasks/**/*.js', 'tests/**/*.js'],
            options: {
                config: '.jscsrc'
            }
        },
        nodeunit: {
            tests: ['tests/*_test.js']
        },
        msgfmt: {
          all: {
            files: [
              {src: ['tests/fixtures/**/*'], dest: 'tmp/'}
            ],
            options: {
              prefix: 'define(function() {\n',
              suffix: '\n});'
            }
          }
        }
    });

    grunt.registerTask('test', function(file) {
        grunt.task.run('jshint');
        grunt.task.run('jscs');
        grunt.config('nodeunit.tests', String(grunt.config('nodeunit.tests')).replace('*', file || '*'));
        grunt.task.run('nodeunit');
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jscs');

    grunt.registerTask('default', ['clean', 'test']);
};
