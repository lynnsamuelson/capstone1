module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['../app/**/*.js'],
      options: {
        esnext: true
      }
    },
    sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    // imagemin: { 
    //   dynamic: { 
    //     options: {
    //       optimizationLevel: 3,
    //       progressive: true,
    //       interlaced: true
    //     },                        // Another target 
    //     files: [{
    //       expand: true,                  // Enable dynamic expansion 
    //       cwd: '../images/',                   // Src matches are relative to this path 
    //       src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
    //       dest: '../imagemin/'                  // Destination path prefix 
    //       }]
    //   }
    // },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};
