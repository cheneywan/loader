
sysPath = require 'path'

module.exports = (grunt) ->
  grunt.initConfig(

    coffee:
      main:
        expand: true
        src: ['src/*.coffee']
        dest: 'demo/'
        ext: '.js'

    watch:
      options: livereload: true
      coffee:
        files: 'src/*.coffee'
        tasks: ['coffee']

  )
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee', 'watch']

