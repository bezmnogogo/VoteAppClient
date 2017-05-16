/**
 * Created by home on 14.05.17.
 */
/**
 * Created by home on 13.05.17.
 */

(function () {
    "use strict";

    angular.module("myApp").factory("questionService", questionService);

    function questionService($http, $localStorage) {

        var service = {
            addCategory: addCategory,
            getUserCategories: getUserCategories,
            getTypes: getTypes,
            addQuestion: addQuestion,
            getQuestionsByCategory: getQuestionsByCategory
        };

        return service;

        function addCategory(category) {
            return $http.post("http://localhost:8080/question/addCategory", {categoryName: category}).then(function (response) {
                return response.data;
            });
        }

        function getUserCategories() {
            return $http.get("http://localhost:8080/question/getUserCategories").then(function (response) {
                return response.data;
            });
        }

        function getTypes() {
            return $http.get("http://localhost:8080/question/getTypes").then(function (response) {
                return response.data;
            });
        }

        function addQuestion(question) {
            return $http.post("http://localhost:8080/question/addQuestion", question).then(function (response) {
                return response.data;
            });
        }

        function getQuestionsByCategory(categoryId) {
            return $http.get('http://localhost:8080/question/getQuestionsByCategory/'+ categoryId).then(function (response) {
                return response.data;
            });
        }
    }

})();
