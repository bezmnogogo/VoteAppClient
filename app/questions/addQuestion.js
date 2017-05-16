/**
 * Created by home on 13.05.17.
 */
'use strict';

angular.module('myApp.addQuestion', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addQuestion', {
            templateUrl: 'questions/addQuestion.html',
            controller: 'AddQuestionCtrl'
        });
    }])

    .controller('AddQuestionCtrl', ['$scope', '$http', '$localStorage', 'questionService', function ($scope, $http, $localStorage, questionService) {
        var $ctrl = this;
        $ctrl.getUserCategories = getUserCategories;
        $ctrl.addQuestion = addQuestion;
        $ctrl.getNum = getNum;
        $ctrl.incCount = incCount;
        $ctrl.dropOptions = dropOptions;
        $ctrl.setOtherOptionsNotCorrect = setOtherOptionsNotCorrect;

        function init() {
            getUserCategories();
            getQuestionTypes();
            $ctrl.selectedQuestionOptions = [];
            $ctrl.count = 1;
        }

        function incCount() {
            $ctrl.count++;
        }

        function dropOptions() {
            $ctrl.count = 1;
            $ctrl.selectedQuestionOptions = [];
        }

        function getNum() {
            return getArray($ctrl.count);
        }

        function getArray(num) {
            var a = [];
            for (var i = 0; i < num; i++){
                a[i] = i;
            }
            return a;
        }

        function setOtherOptionsNotCorrect(index) {
            for(var i = 0; i < $ctrl.selectedQuestionOptions.length; i++){
                if(i !== index){
                    $ctrl.selectedQuestionOptions[i].isCorrect = false;
                }
            }
        }

        function getUserCategories() {
            questionService.getUserCategories().then(function (response) {
                $ctrl.categories = response.categories;
            });
        }

        function getQuestionTypes() {
            questionService.getTypes().then(function (response) {
                $ctrl.questionTypes = response.questionTypes;
            });
        }

        function addQuestion() {
            var question = {};
            question.question = $ctrl.question;
            question.selectedQuestionOptions = $ctrl.selectedQuestionOptions;
            question.selectedTypeId = $ctrl.selectedType.id;
            question.selectedCategoryId = $ctrl.selectedCategory.id;
            questionService.addQuestion(question).then(function (response) {
                var data = response.status;
            });
        }



        init();
    }]);
