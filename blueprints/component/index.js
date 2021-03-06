/*
 * @fileOverview
 * @author: Mike Grabowski (@grabbou)
 */

'use strict';

module.exports = {
  description: 'Generates new component',

  flags: [{
    type: Boolean,
    name: '-p, --plain-component',
    description: 'Generates pure component that does not wrap another one'
  }, {
    type: Boolean,
    name: '-d, --decorator',
    description: 'Generates a decorator'
  }],

  locals: function(file, options) {
    return {
      isPlainComponent: !!options.flags.plainComponent,
      isDecorator: !!options.flags.decorator
    };
  }
};
