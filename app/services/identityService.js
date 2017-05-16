/**
 * Created by home on 13.05.17.
 */

(function () {
    "use strict";

    angular.module("myApp").factory("identityService", identityService);

    function identityService($http, $localStorage) {

        var service = {
            login: login,
            //logout: logout
            tryRefreshQuickInfo: tryRefreshQuickInfo
            // getProfile: getProfile,
            // addContact: addContact,
            // confirmContact: confirmContact,
            // deleteContact: deleteContact,
            // makePrimaryContact: makePrimaryContact
        };

        //init();

        return service;

        function login(user) {
            service.quickInfo = "Andrei";
            return $http.post("http://localhost:8080/identity/login", user).then(
                function (response) {
                    $localStorage.userAccesToken = response.data.accessToken;
                    return response.data;
                }, function (response) {
                    alert('неправильные логин или пароль. Попробуйте снова.');
                });
        }

        function tryRefreshQuickInfo() {
            service.quickInfo = "Andrei";
        }
    }

})();
