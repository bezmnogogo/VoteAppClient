/**
 * Created by home on 13.05.17.
 */
(function () {
    "use strict";
    angular.module("myApp").component("voteNavigationBar", {
        templateUrl: "menu/navigationBar.html",
        controller: NavigationBarController
    });

    function NavigationBarController($scope, $localStorage, identityService) {
        var $ctrl = this;
        $ctrl.logout = logout;

        function init(){
        }

        function login() {

        }

        function logout() {
            if($localStorage.userAccesToken)
                delete $localStorage.userAccesToken;
        }
        init();
    }
})();