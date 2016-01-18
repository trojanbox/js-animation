'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                mangle: true,       // 混淆变量名
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            files: {
                src: ['src/util.js', 'src/component/*.js', 'src/window/*.js'],
                dest: 'javascript/dist/window.component.min.js'
            }
        },
        'requirejs': {
            compile: {
                options: {
                    optimize: "none",
                    baseUrl: "./",
                    // mainConfigFile: "path/to/config.js",
                    name: "src/window.js", // assumes a production build using almond
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    exclude: ['jquery'],
                    out: "./build/window.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ['requirejs']);
};