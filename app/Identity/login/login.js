'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'Identity/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$http', '$localStorage', 'identityService' ,function ($scope, $http, $localStorage, identityService) {
        var $ctrl = this;
        $ctrl.login = login;

        function login() {
            var data1 = identityService.login($ctrl.user).then(function (data) {
                var response = data;
            });
        }
    }]);