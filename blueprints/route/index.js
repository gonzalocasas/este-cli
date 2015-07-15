/*
 * @fileOverview
 * @author: Mike Grabowski (@grabbou)
 */

'use strict';

var Promise = require('bluebird');
var File = require('../../lib/models/file');
var ImportDeclaration = require('../../lib/models/importDeclaration');
var fs = require('fs');
var recast = require('recast');
var b = recast.types.builders;
var path = require('path');
var pascalCase = require('pascal-case');
var pathCase = require('path-case');

module.exports = {

  skipExistingFiles: true,

  description: 'Generates new route',

  afterInstall: function(options) {

    var storePath = path.join(options.rootFolder, 'routes.js');
    var file = File.load(storePath);

    var topMostRoute = file.getJSXElement();
    if (!topMostRoute) {
      return Promise.reject('No routes defined. Make sure at least topmost route is defined');
    }

    var importPath = './pages/' + options.blueprintName + '.react';
    var pageImport = file.getImportDeclaration(importPath);

    // If not, add import statement
    if (!pageImport) {
      file.prependCode('import ' + pascalCase(options.blueprintName) + ' from \'' + importPath + '\';\n');
      pageImport = file.getImportDeclaration(importPath);
    }

    var specifiers = pageImport.specifiers;

    // Get class name from import to refer in a route
    var className = specifiers[0].id.name;

    // Check if route is already defined
    var alreadyHasRoute = false;

    // @TODO make JSXElement model
    recast.visit(topMostRoute, {

      // Check all {} expression in JSX to find {className}
      visitJSXExpressionContainer: function(expression) {
        if (expression.get('expression').value.name === className) {
          alreadyHasRoute = true;
          this.abort();
        }
        return false;
      }

    });

    // Create page node
    // @TODO support nested elements
    // @TODO support specifying path
    var node = b.jsxElement(
      b.jsxOpeningElement(
        b.jsxIdentifier('Route'),
        [
          b.jsxAttribute(
            b.jsxIdentifier('handler'),
            b.jsxExpressionContainer(
              b.identifier(className)
            )
          ),
          b.jsxAttribute(
            b.jsxIdentifier('path'),
            b.literal(pathCase(options.blueprintName))
          )
        ],
        true
      )
    );

    if (!alreadyHasRoute) {
      topMostRoute.get('children').push(node, '\n');
    }

    Promise.fromNode(function(callback) {
      fs.writeFile(storePath, file.print(), callback);
    });

  }

};
