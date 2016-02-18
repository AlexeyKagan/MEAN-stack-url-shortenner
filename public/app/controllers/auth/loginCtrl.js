angular.module('loginCtrl', ['authService'])
    .controller('loginController', ['$location','auth','authToken', function ($location, auth, authToken) {
        var vm = this;

        vm.login = () => {
            auth.doLogin(vm.username, vm.password)
                .success((data) => {
                    vm.message = data.message;
                    
                    if (data.success) {                        
                        vm.token = data.token;
                        authToken.setToken(vm.token);
                        $location.path('/');
                    }
                })
        }
    }]);


console.log('loginCtrl');


