var grunt = require('grunt');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var resourceFile = require('../tasks/inc/resourceFile');
var fixtures = path.join(__dirname, 'fixtures');

exports.resourceFile = {
  getLocaleNameTest: function(test) {
    'use strict';

    test.expect(1);

    var fileName = fixtures + '/test.test.properties';

    var localeName = resourceFile.getLocaleName(fileName);
    test.equal(localeName, 'test.test', 'Get Bundle Name');

    test.done();
  },

  getMessageObjTest: function(test) {
    'use strict';

    test.throws(
        function() {
          resourceFile.getMessageObj('foobar', 'foobar');
        },
        Error,
        'Invalid format throws an error'
    );

    var jsonFile = fixtures + '/en.json';
    var propFile = fixtures + '/en.properties';

    var testMessage = {'test-message': 'test message'};

    var propObj = resourceFile.getMessageObj(jsonFile, 'json');
    test.deepEqual(propObj, testMessage);

    propObj = resourceFile.getMessageObj(propFile, 'properties');
    test.deepEqual(propObj, testMessage);

    propObj = resourceFile.getMessageObj(propFile, 'props');
    test.deepEqual(propObj, testMessage);

    propObj = resourceFile.getMessageObj(propFile, 'prop');
    test.deepEqual(propObj, testMessage);

    test.done();

  },

  getMessageFormatterTest: function(test) {
    var propFile = fixtures + '/en.properties';
    var mfunc = resourceFile.getMessageFormatter(propFile, 'prop');

    var msgFuncs = mfunc();

    test.equal(_.isFunction(msgFuncs['test-message']), true);

    propFile = fixtures + '/en.json';
    mfunc = resourceFile.getMessageFormatter(propFile, 'json');

    msgFuncs = mfunc();

    test.equal(_.isFunction(msgFuncs['test-message']), true);

    test.done();

  }
};
