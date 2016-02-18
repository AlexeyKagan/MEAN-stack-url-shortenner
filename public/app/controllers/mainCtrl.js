angular.module('mainCtrl', [])
    .controller('mainController', ['auth', '$location','appFactory','$http','$window', function (auth, $location,appFactory,$http,$window) {
        var vm = this;    
        
        if (!auth.isLoggedIn())
            $location.path('/login');
        auth.getUser().then((data)=>{
            vm.user = data;
        });

        
        vm.getShortUrl = () => {            
            var short = makeId();  
            
            if (vm.longUrl){ //if longurl is not empty then create short url
                
                appFactory.createShortUrl(vm.longUrl,short,vm.description,vm.tags)
                    .success((data) => {   
                        
                        if (data.success) {
                            vm.shortUrl ="localhost:8080/"+ short;
                        }
                    });
            }
        };
       // $http.get('/:id').success((data)=>{
        //    $window.location.href = "http://vk.com";
        //})
    }]);
   

console.log('mainCtrl');

//gen random short url
function makeId(){
    var text ="";
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for(var i=0;i<6;i++){
        
        text += str.charAt(Math.floor(Math.random() * str.length))        
    }
    return text;
    
}