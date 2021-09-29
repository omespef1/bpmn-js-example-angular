import PaletteProvider from './PaletteProvider';

module.exports = {
    __depends__: [
      require('../palette-override'),
      require('diagram-js/lib/features/create'),
      require('diagram-js/lib/features/space-tool'),
      require('diagram-js/lib/features/lasso-tool'),
      require('diagram-js/lib/features/hand-tool'),
      require('diagram-js/lib/features/global-connect')
    ],
    __init__: [ 'paletteProvider' ],
    paletteProvider: [ 'type', paletteProvider ]
  };