/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      river: {
        files: {
          'js/river.min.js': ['lib/jquery/jquery-1.11.1.js', 'lib/handelbars/handelbars-v1.3.0.js', 'lib/prismic/prismic.io-1.0.12.js', 'lib/bootstrap/js/bootstrap.js', 'js/river.js']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'css/river.min.css': ['css/river.css']
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/**'],
        tasks: ['uglify', 'cssmin'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'cssmin']);
};
