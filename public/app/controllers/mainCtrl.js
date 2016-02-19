angular.module('mainCtrl', [])
    .controller('mainController', ['auth', '$location', 'appFactory', '$http', '$window', function (auth, $location, appFactory, $http, $window) {
        var vm = this;

        //check if user is logged in
        if (!auth.isLoggedIn())
            $location.path('/login');

        auth.getUser().then((data)=> {
            vm.user = data;
        });
        //if submit create short url
        vm.getShortUrl = () => {
            var short = makeId();

            if (vm.longUrl) { //if longurl is not empty then create short url

                appFactory.createShortUrl(vm.longUrl, short, vm.description, vm.tags)
                    .success((data) => {

                        if (data.success) {
                            vm.shortUrl = "localhost:8080/" + short;
                        }
                    });
            }
            //update list of urls
            appFactory.getUrls().success(function (data) {
                vm.linkz = data;
            });
        };
        //get all urls
        appFactory.getUrls().success(function (data) {
            console.log(data);
            vm.linkz = data;
        });

    }])

    //############ GET ABOUT URL ############//
    .controller('aboutController', ['$stateParams', 'appFactory', function ($stateParams, appFactory) {
        var vm = this;
        
        appFactory.aboutUrl($stateParams.id).success(function(data){
            vm.urlAbout = data;
        })
        
        
    }]);


function makeId() {
    var text = "";
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++) {

        text += str.charAt(Math.floor(Math.random() * str.length))
    }
    return text;

}

console.log('mainCtrl');