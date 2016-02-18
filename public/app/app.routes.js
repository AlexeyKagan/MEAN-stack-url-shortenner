angular.module('app.routes', ['ui.router']) //angular routes
    .config(['$stateProvider','$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider,$locationProvider) {
        $stateProvider
            .state('main', {
                url:'/',
                templateUrl: 'app/views/pages/main.html',
                controller:'mainController',
                controllerAs: 'main'
            })
            
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/pages/auth/login.html',
                controller: 'loginController',
                controllerAs: 'login'
            })
            
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/views/pages/auth/signup.html',
                controller: 'signupController',
                controllerAs: 'signup'
            })
            
            .state('redir', {
                url: '/:id',                
                controller : function($window,$http,$stateParams){
                    
                    $http.get('/api/' + $stateParams.id).then(function (data) {
                        console.log(data);
                        console.log(data.data.a);

                        if (data.data.a == 'bug') $window.location.href = '/';

                        else $window.location.href = data.data.a;

                    })
                }         
            });
            $urlRouterProvider.otherwise('/');
            
        
        $locationProvider.html5Mode(true);
        //$urlRouterProvider.html5Mode(true);
    }]);

    


console.log('app.routes');