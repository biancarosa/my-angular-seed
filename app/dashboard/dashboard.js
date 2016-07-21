'use strict';

angular.module('myApp.dashboard',[
  'ui.router'
])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    });
}])
.controller('DashboardCtrl', ['$scope', function($scope) {
}]);
