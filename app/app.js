'use strict';

angular.module('myApp', [ 'ui.router', 'myApp.dashboard' ])
    .config(['$urlRouterProvider', function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');
        $urlRouterProvider.when('/', '/dashboard');
    }])
    .factory("constants", ['API_URL', function(API_URL) {
        return {
            "API_URL": API_URL
        };
    }]);
