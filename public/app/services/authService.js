angular.module('authService', [])
    .factory('auth', ['$http', 'authToken', '$q', ($http, authToken, $q) => {
        const authFactory = {};

        authFactory.doLogin = (username, password) => {
            return $http.post('/api/login', {
                username: username,
                password: password
            })
        };

        authFactory.doSignup = (name, username, password) => {
            return $http.post('/api/signup', {
                name: name,
                username: username,
                password: password
            })
        };

        authFactory.doLogout = () => {
            return authToken.setToken();
        };

        authFactory.isLoggedIn = () => { //!!!1
            if (authToken.getToken())
                return true;
            else
                return false;
        };

        authFactory.getUser = () => {
            if (authToken.getToken())
                return $http.get('/api/me', {cache: true});
            else
                return $q.reject({message: 'User has no token.'});
        };


        return authFactory;

    }])
    .factory('authToken', ['$window', ($window) => {
        const authToken = {};

        authToken.getToken = () => {
            return $window.localStorage.getItem('token');
        };

        authToken.setToken = (token) => {
            if (token) {
                $window.localStorage.setItem('token', token);
            }
            else {
                $window.localStorage.removeItem('token');
            }
        };


        return authToken;
    }])
    // ===================================================
    // application configuration to integrate token into requests
    // ===================================================
    .factory('AuthInterceptor', function ($q, $location, authToken) {
        const interceptorFactory = {};

        interceptorFactory.request = function (config) {
            const token = authToken.getToken();
            
            if (token)
                config.headers['x-access-token'] = token;
            return config;
        };

        interceptorFactory.responseError = function (response) {
            if (response.status == 403) {
                authToken.setToken();
                $location.path('/login');
            }

            return $q.reject(response);
        };
        
        
        return interceptorFactory;
    });
