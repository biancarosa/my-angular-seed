'use strict';

module.exports = function(config) {
    var sourcePreprocessors = 'coverage';
    function isDebug(argument) {
        return argument === '--debug';
    }
    if (process.argv.some(isDebug)) {
        sourcePreprocessors = [];
    }
    config.set({

        basePath: './',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'app/bower_components/angular-auto-validate/dist/jcs-auto-validate.min.js',
            'app/bower_components/ngstorage/ngStorage.min.js',
            'app/bower_components/lodash/dist/lodash.js',
            'app/!(bower_components|build)/**/*.js',
            'app/bower_components/ng-file-upload/ng-file-upload.min.js',
            'app/bower_components/ng-tags-input/ng-tags-input.min.js',
            'http://maps.googleapis.com/maps/api/js?sensor=false&language=en'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        reporters: ['progress', 'junit', 'coverage'],

        browsers: ['PhantomJS'],

        preprocessors: {
            'app/!(*bower_components)/**/!(*test).js': sourcePreprocessors
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },
        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }

    });
};
