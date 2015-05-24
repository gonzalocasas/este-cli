/*
 * @fileOverview
 * @author: Mike Grabowski (@grabbou)
 */

'use strict';

var path = require('path');
var paramName = require('param-case');
var camelCase = require('camel-case');

module.exports = {
  name: 'Page generator',
  description: 'Generates new page',
  mapTemplateVariables: function(file, options) {
    return {
      cssName: paramName(options.blueprintName),
      objectName: camelCase(options.blueprintName)
    }
  }
};