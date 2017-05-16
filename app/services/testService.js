(function () {
    "use strict";

    angular.module("myApp").factory("testService", testService);

    function testService($http, $localStorage) {

        var service = {
            createTest: createTest
        };

        return service;

        function createTest(test) {
            return $http.post("http://localhost:8080/test/add", test).then(function (response) {
               return response.data;
            });
        }
    }

})();
