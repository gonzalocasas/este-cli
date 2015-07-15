/*
 * @fileOverview
 * @author: Mike Grabowski (@grabbou)
 */

'use strict';

var Promise = require('bluebird');
var Blueprint = require('../../lib/models/blueprint');

module.exports = {

  description: 'Generates new feature',

  flags: [{
    type: Boolean,
    name: '-p, --page',
    description: 'Generates new page with feature as well'
  }],

  beforeInstall: function(options) {
    var blueprints = [
      Blueprint.load('store'),
      Blueprint.load('action'),
      Blueprint.load('translate')
    ];

    if (options.flags.page) {
      blueprints.push(Blueprint.load('page'));
    }

    return Promise.all(blueprints.map(function(blueprint) {
      return blueprint.install(options);
    }));
  }

};
