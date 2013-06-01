'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

var deployConfig =
{
	 auth: {
	    host: 'localhost',
	    username : 'flocks',
	    port: 22,
	    password: 'Ff56725672.'
	},
	path : '/home'
}

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
	separator: ';'
      },
      dist: {
	src: ['app/**/*.js'],
	dest: 'dist/<%= pkg.name %>.js'
      }
    },
    sass: {
       dist: {
	 files: {
	  'app/styles/main.css': 'app/styles/main.scss'
	 }
       }
    },
    uglify: {
      options: {
	banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
	files: {
	  'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
	}
      }
    },

    jshint: {
      files: ['app/app.js'],
      options: {
	// options here to override JSHint defaults
	globals: {
	  jQuery: true,
	  console: true,
	  module: true,
	  document: true
	}
      }
    },
    livereload: {
      port: 35729 // Default livereload listening port.
    },
    connect: {
      livereload: {
	options: {
	  port: 9001,
	  middleware: function(connect, options) {
	    return [lrSnippet, folderMount(connect, options.base)]
	  }
	}
      }
    },
    // Configuration to be run (and then tested)
    regarde: {
      js: {
	files: ['app/models/*.js', 'app/app.js', 'app/views/*.js', 'app/collections/*.js'],
	tasks: ['hj;cl: ', 'concat','uglify','livereload']
      },
      css: {
	files: '**/*.scss',
	 tasks: ['sass',,'livereload'],
	 events: true
       }
    },
 requirejs: {
  compile: {
    options: {
      name : "main",
      baseUrl: "app/",
      mainConfigFile: "app/main.js",
      out: "dist/optimized.js",
      logLevel: 0,
      preserveLicenseComments: false
    }
  }
},

  copy : {
    main: {
      files: [
	{expand: true, src: ['index.html'], dest: 'dist/', filter: 'isFile'}, // includes files in path
	{expand : false, src: ['app/styles/main.css'], dest : "dist/styles/main.css" },
	{expand : false, src: ['app/lib/require.js'], dest : "dist/require.js" }

      ]
   }
  },


  s3: {
    options: {
      key: 'AKIAINEWILJ33O57FLLQ',
      secret: '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',
      bucket: 'cornelien.com',
      secure : false,
      access: 'public-read',
      region: 'eu-west-1'
    },
    dev: {
      // These options override the defaults
      options: {
	encodePaths: true,
	maxOperations: 20
      },
      // Files to be uploaded.
      upload: [
	{
	  src: 'dist/optimized.js',
	  dest: 'optimized.js'
	},
	{
	  src: 'index.html',
	  dest: 'index.html',
	},
	{
	  src: 'dist/styles/main.css',
	  dest: 'styles/main.css',
	},
	 {
	  src: 'dist/require.js',
	  dest: 'require.js',
	},
	 {
	  src: 'app/images/*',
	  dest: 'images/'
	}



      ]

    }

  }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');


  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('server', ['livereload-start', 'connect', 'regarde']);
  grunt.registerTask('build', ['requirejs','sass' ,'copy']);
  grunt.registerTask('deploy', ['s3'])

};