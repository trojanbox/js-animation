'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'requirejs': {
            dialog: {
                options: {
                    optimize: "none",
                    baseUrl: "./src",
                    //appDir: './bulid',
                    //dir: './build',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    paths: {
                        'jquery': '../node_modules/jquery/dist/jquery'
                    },
                    name: 'build/dialog',
                    exclude: ['jquery'],
                    out: "build/dialog.js"
                }
            }
        },
        'uglify': {
            options: {
                mangle: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files: {
                src: ['build/dialog.js'],
                dest: 'javascript/dist/dialog.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['uglify']);
};