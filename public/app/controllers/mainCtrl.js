angular.module('mainCtrl', [])
    //####### mainController for create shorturl ######
    .controller('mainController', ['auth', '$location', 'appFactory', '$http', '$window', function (auth, $location, appFactory, $http, $window) {
        var vm = this;

        //check if user is logged in
        if (!auth.isLoggedIn())
            $location.path('/login');

        auth.getUser().then((data)=> {
            console.log(data);
            vm.user = data;
        });
        
        vm.doLogout = () => {
            auth.doLogout();
            $location.path('/login');
        };
        
        
        
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
            vm.aboutLink = "localhost:8080/about/" + short;
        };
        //get all urls
        appFactory.getUrls().success(function (data) {
            console.log(data);
            vm.linkz = data;
        });
        
        //DELETE URL
        vm.delete = (id) => {
            appFactory.deleteUrl(id).success(function(data){
                
                vm.message = data.message;
            });
            appFactory.getUrls().success(function(data){
                vm.linkz = data;
            })
            
        };
       // appFactory.deleteUrl()

    }])

    //############ GET ABOUT URL ############//
    .controller('aboutController', ['$stateParams', 'appFactory', function ($stateParams, appFactory) {
        var vm = this;
        
        appFactory.aboutUrl($stateParams.id).success(function(data){
            vm.urlAbout = data;
            console.log(vm.urlAbout)
        })
    }])
    
    //####### change controller ############//
    .controller('changeController', ['$stateParams', 'appFactory', function ($stateParams, appFactory) {
        var vm = this;

        appFactory.ChangeAboutUrl($stateParams.id).success(function(data){
            vm.urlAbout = data;
            console.log(vm.urlAbout)
        });
        
        //update
        vm.change = () => {
            appFactory.AboutUpdate($stateParams.id, vm.description, vm.tags).success(function (data) {
                vm.message = data.message;
            });
        }
        
    }]);

//make random id for short url
function makeId() {
    var text = "";
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++) {

        text += str.charAt(Math.floor(Math.random() * str.length))
    }
    return text;

}

console.log('mainCtrl');