angular.module('signupCtrl', ['authService'])
    .controller('signupController', ['auth', '$location','authToken', function (auth, $location, authToken) {
        var vm = this;

        vm.signup = () => {
            auth.doSignup(vm.name, vm.username, vm.password)
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


console.log('signupCtrl');
