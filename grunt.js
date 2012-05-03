/*global module:false*/
module.exports = function(grunt) {
  var path, dist, concat = {}, min = {};

  path = function( module, type ) {
    type = type || 'js';
    return 'src/' + module + '/vise.' + module + '.' + type;
  };

  // @todo: Make this a bit nicer.
  dist = function( name, type, files ) {
    var slug = name + '_' + type;

    concat[ slug ] = {
      dest: 'dist/<%= pkg.name %>.' + name + '.' + type,
      src: files.map( function( file ) {
        return path( file, type );
      })
    };

    concat[ slug ].src.unshift( '<banner:meta.banner>' );

    if ( 'js' === type ) {
      concat[ slug ].separator = ';';
      min[ slug ] = {
        src: ['<banner:meta.banner>', '<config:concat.' + slug + '.dest>'],
        dest: 'dist/<%= pkg.name %>.' + name + '.min.' + type
      };
    }
  };

  dist( 'core', 'js',  [ 'core' ]);
  dist( 'core', 'css', [ 'core' ]);
  dist( 'all',  'js',  [ 'core', 'frame', 'loader', 'mask', 'center' ]);
  dist( 'all',  'css', [ 'core', 'frame', 'loader', 'mask' ]);

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: concat,
    min: min,
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        smarttabs: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

};
