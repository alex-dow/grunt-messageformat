var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var PropertiesParser = require('properties-parser');
var MessageFormat = require('messageformat');

module.exports = {

  getLocaleName: function(fileName) {

    var baseName = path.basename(fileName);
    var fileNameParts = baseName.split('.');
    fileNameParts.pop();

    var localeName = fileNameParts.join('.');
    return localeName;
  },

  getBundleFromProperties: function(fileName) {
    var propObj = PropertiesParser.read(fileName);
    return propObj;
  },

  getBundleFromJson: function(fileName) {
    var jsonContent = fs.readFileSync(fileName);
    return JSON.parse(jsonContent);
  },

  getMessageObj: function(fileName, format) {
    console.log('format: ' + format);
    var propObj;
    switch (format) {
      case 'json':
        propObj = this.getBundleFromJson(fileName);
        break;
      case 'properties':
      case 'props':
      case 'prop':
        propObj = this.getBundleFromProperties(fileName);
        break;
      default:
        var err = new Error('Invalid bundle format: ' + format);
        throw err;
    }
    return propObj;
  },

  getMessageFormatter: function(fileName, format) {
    var locale = this.getLocaleName(fileName);
    var propObj = this.getMessageObj(fileName, format);

    var mf = new MessageFormat();

    var mfunc = mf.compile(propObj);
    return mfunc;
  }
};
