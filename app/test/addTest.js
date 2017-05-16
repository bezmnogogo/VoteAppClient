/**
 * Created by home on 13.05.17.
 */
'use strict';

angular.module('myApp.addTest', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/test/add', {
            templateUrl: 'test/addTest.html',
            controller: 'AddTestCtrl'
        });
    }])

    .controller('AddTestCtrl', ['$scope', '$http', '$localStorage', 'questionService', 'testService' , function ($scope, $http, $localStorage, questionService, testService) {
        var $ctrl = this;
        $ctrl.getUserCategories = getUserCategories;
        $ctrl.showCategoryQuestions = showCategoryQuestions;
        $ctrl.incCount = incCount;
        $ctrl.dropOptions = dropOptions;
        $ctrl.getNum = getNum;
        $ctrl.incPeopleCount = incPeopleCount;
        $ctrl.cancelOneMail = cancelOneMail;
        $ctrl.getPeopleNum = getPeopleNum;
        $ctrl.addTestQuestion = addTestQuestion;
        $ctrl.cancelOneTestQuestion = cancelOneTestQuestion;
        $ctrl.getTestQuestionNum = getTestQuestionNum;
        $ctrl.setOtherOptionsNotCorrect = setOtherOptionsNotCorrect;
        $ctrl.getQuestionTypes = getQuestionTypes;
        $ctrl.addQuestion = addQuestion;
        $ctrl.createTest = createTest;

        function init() {
            $ctrl.count = 1;
            $ctrl.peopleCount = 1;
            $ctrl.testQuestionCount = 1;
            $ctrl.testPeople = [];
            $ctrl.testQuestions = [];
            $ctrl.selectedQuestionOptions = [];
            getUserCategories();
            getQuestionTypes();
        }
        
        function createTest() {
            testService.createTest({testOptions: $ctrl.testOptions, testPeople: $ctrl.testPeople, testQuestions: $ctrl.testQuestions}).then(function (response) {
                var data = response;
            });
        }

        function cancelOneTestQuestion(i) {
            $ctrl.testQuestions.splice(i, 1);
            $ctrl.testQuestionCount--;
        }

        function getTestQuestionNum() {
            return getArray($ctrl.testQuestionCount);
        }

        function addTestQuestion(question) {
            $ctrl.testQuestionCount++;
            $ctrl.testQuestions.push(question);
        }

        function incCount() {
            $ctrl.count++;
        }

        function incPeopleCount() {
            $ctrl.peopleCount++;
        }

        function dropOptions() {
            $ctrl.count = 1;
            $ctrl.selectedQuestionOptions = [];
        }

        function getNum() {
            return getArray($ctrl.count);
        }

        function getPeopleNum() {
            return getArray($ctrl.peopleCount);
        }

        function setOtherOptionsNotCorrect(index) {
            for(var i = 0; i < $ctrl.selectedQuestionOptions.length; i++){
                if(i !== index){
                    $ctrl.selectedQuestionOptions[i].isCorrect = false;
                }
            }
        }

        function cancelOneMail(i) {
            $ctrl.testPeople.splice(i, 1);
            $ctrl.peopleCount--;
        }

        function getArray(num) {
            var a = [];
            for (var i = 0; i < num; i++){
                a[i] = i;
            }
            return a;
        }

        function getQuestionTypes() {
            questionService.getTypes().then(function (response) {
                $ctrl.questionTypes = response.questionTypes;
            });
        }

        function showCategoryQuestions(category) {
            questionService.getQuestionsByCategory(category.id).then(function (response) {
                $ctrl.categoryQuestions = response;
            });
        }

        function getUserCategories() {
            questionService.getUserCategories().then(function (response) {
                $ctrl.categories = response.categories;
            })
        }

        function addQuestion() {
            var question = {};
            question.question = $ctrl.question;
            question.selectedQuestionOptions = $ctrl.selectedQuestionOptions;
            question.selectedTypeId = $ctrl.selectedType.id;
            question.selectedCategoryId = $ctrl.selectedCategory.id;
            questionService.addQuestion(question).then(function (response) {
                question.id = response.id;
                addTestQuestion(question);
                dropOptions();
            });
        }

        init();
    }]);