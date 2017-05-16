/**
 * Created by home on 13.05.17.
 */
'use strict';

angular.module('myApp.questions', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/questions', {
            templateUrl: 'questions/questions.html',
            controller: 'QuestionsCtrl'
        });
    }])

    .controller('QuestionsCtrl', ['$scope', '$http', '$localStorage', 'questionService', function ($scope, $http, $localStorage, questionService) {
        var $ctrl = this;
        $ctrl.addCategory = addCategory;
        $ctrl.getUserCategories = getUserCategories;
        $ctrl.showCategoryQuestions = showCategoryQuestions;

        function addCategory() {
            questionService.addCategory($ctrl.categoryName).then(function (response) {
                $ctrl.data = response;
            })
        }

        function showCategoryQuestions(category) {
            $ctrl.questions = category.questions;
            questionService.getQuestionsByCategory(category.id).then(function (response) {
                $ctrl.questions = response;
            })
        }

        function getUserCategories() {
            questionService.getUserCategories().then(function (response) {
                $ctrl.categories = response.categories;
            })
        }
    }]);