'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        assemble: {

            // Task-level options
            options: {
                flatten: true,
                data: ['assemble/edata/**/*.{json,yml}'],
                helpers: 'assemble/helpers/*.js',
                layoutdir: 'assemble/layouts',
                partials: ['assemble/partials/**/*.hbs', 'assemble/layouts/**/*.hbs']
            },
            site: {
                options: { },
                files: [
                    { src: ['assemble/pages/**/*.hbs'], dest: '.' }
                ]
            }
        },

        watch: {
            scripts: {
                files: ['assemble/**/*.*'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        },
        
        connect: {
            server: {
                options: {
                    port: 6001
                }
            }
        },

        // Before generating any new files,
        // remove any previously-created files.
        clean: {
            all: ['*.html']
        }
    });

    // Load npm plugins to provide necessary tasks.
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-verb');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task to be run.
    grunt.registerTask('default', ['build','connect', 'watch']);
    grunt.registerTask('build', ['clean', 'assemble']);
};
