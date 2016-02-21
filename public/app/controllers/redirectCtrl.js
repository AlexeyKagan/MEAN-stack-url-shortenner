angular.module('redirectCtrl', [])
    .controller('redirectController', ['$http', '$window', '$routeParams',
        
        function ($http, $window, $routeParams) {
            /*$http.get('/api/' + $routeParams.id).then(function (data) {
                var a = data;
                var c = data.data;
                //if (!data.data) $window.location.href = "/";
                if ($window.location.href) $window.location.href = '/';
                //else 
                $window.location.href = data.data;
                
            })
            
            $http.get('/api/' + $routeParams.id).then(function (data) {
                console.log(data);
                console.log(data.a);
                
                if (data.data.a == 'bug') $window.location.href = '/';
               
                else $window.location.href = data.data.a;

            })
             */

        }]);
console.log('redirectCtrl');

