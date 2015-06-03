/**
 * grunt-messageformat
 * http://github.com/alex-dow/grunt-messageformat
 *
 * Copyright (c) 2015 Alex Dowgailenko, contributors
 * Licensed under the MIT License
 */

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var MessageFormat = require('messageformat');
var resourceFile = require('./inc/resourceFile');

module.exports = function(grunt) {
  'use strict';
  grunt.registerMultiTask('msgfmt', 'Create message bundles using MessageFormat', function() {

    var options = this.options({
      prefix: '',
      suffix: '',
      format: null
    });

    this.files.forEach(function(file) {
      grunt.log.writeln(file.src.length + ' resource files to process');

      file.src.forEach(function(f) {
        grunt.log.writeln('Processing ' + f);

        var format = options.format === null ? f.split('.').pop() : options.format;

        var mfunc = resourceFile.getMessageFormatter(f, format);
        var localeName = resourceFile.getLocaleName(f);
        var output = options.prefix + mfunc.toString() + options.suffix;

        var dest = file.dest;
        var destFile = dest + '/' + localeName + '.js';

        grunt.log.writeln('Writing to ' + destFile);

        mkdirp(dest);

        grunt.file.write(destFile, output);
      });
    });
  });
};
