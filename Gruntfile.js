module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ["public/css"]
                },
                files: {
                     "public/css/desktop-result.css": "public/css/desktop.less"
                 }
            },
            production: {
                // options: {
                //     paths: ["assets/css"],
                //     yuicompress: true
                // },
                // files: {
                //     "path/to/result.css": "path/to/source.less"
                // }
            }
        },

        watch: {
            files: ["public/css/*", "server/*.js"],
            tasks: ["less", "jshint"]
        },

        jshint: {
            files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js', 'server/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('default', ['test']);
};
