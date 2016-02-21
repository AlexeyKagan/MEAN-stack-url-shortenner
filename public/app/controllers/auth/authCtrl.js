angular.module('authCtrl', [])
    .controller('authController', ['$rootScope', 'auth', function ($rootScope, auth) {
        var vm = this;
        //vm.loggedIn = auth.isLoggedIn();
        vm.loggedIn = auth.isLoggedIn();
        
        
        $rootScope.$on('$routeChangeStart', function () {
            vm.loggedIn = auth.isLoggedIn();

            auth.getUser()
                .then(function (data) {
                    vm.user = data.data;
                })
        })
        

    }]);
console.log('authCtrl');
