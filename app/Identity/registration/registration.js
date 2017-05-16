'use strict';

angular.module('myApp.registration', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'Identity/registration/registration.html',
            controller: 'RegistrationCtrl'
        });
    }])

    .controller('RegistrationCtrl', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
        var $ctrl = this;
        $ctrl.registrate = registrate;

        function registrate() {
            $http.post("http://localhost:8080/identity/registration", $ctrl.user).then(
                function (response) {
                    $localStorage.userAccesToken = response.data.accessToken;
                }, function (response) {
                    alert('something wrong!');
                });
        }
    }]);