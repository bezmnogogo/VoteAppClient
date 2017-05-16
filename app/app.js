'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngStorage',
    'myApp.login',
    'myApp.registration',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'myApp.questions',
    'myApp.addQuestion',
    'myApp.addTest'
]).config(['$locationProvider', '$routeProvider', '$httpProvider', '$compileProvider', function ($locationProvider, $routeProvider, $httpProvider, $compileProvider) {
    $locationProvider.hashPrefix('!');
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.useApplyAsync(true); // might call $digest just once for multiple actions that are take place at the same time
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // $httpProvider.defaults.headers.post['Authentication-token'] = $localStorage.userAccesToken;
    $httpProvider.interceptors.push("authInterceptor");
    $compileProvider.preAssignBindingsEnabled(true);

    $routeProvider.otherwise({redirectTo: '/login'});
}]).run();
