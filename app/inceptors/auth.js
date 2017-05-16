angular.module("myApp").factory("authInterceptor", function ($localStorage) {
    "use strict";
    return {
        request: request
    };

    function request(config) {
        var token = $localStorage.userAccesToken;
        if (token)
            config.headers["X-Authentication-token"] = token;

        return config;
    }
});