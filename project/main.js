requirejs.config({
  baseUrl: '/app/',
  shim: {
    'lib/backbone': {
      deps: ['lib/jquery', 'lib/lodash'],
      exports: 'Backbone'
    },
    'lib/lodash': {
      exports: '_'
    },
    'lib/jquery': {
      exports: '$'
    },
    'lib/Parse' : {
      exports : 'Parse'
    },
    'app': {
      deps: ['lib/backbone', 'lib/Parse']
    }
  },
  map: {
    '*': {
      'Backbone': 'lib/backbone'
    }
  }
});

require(['app'], function(app) {
  return app.init();
});
