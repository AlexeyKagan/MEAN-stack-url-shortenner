angular.module('appService', [])
    .factory('appFactory', ['$http', function ($http) {
        var appFactory = {};

        //###### CREATE SHORT URL #############
        appFactory.createShortUrl = (longUrl, shortUrl, description, tags) => {
            return $http.post('/api/createShort', {
                longUrl: longUrl,
                shortUrl: shortUrl,
                description: description,
                tags: tags
            })
        };
        
        appFactory.getUrls = () => {
            return $http.get('/api/getUrls');
            
        };
        
        appFactory.aboutUrl = (id) => {
            return $http.get('/api/about/' + id)
        };

        return appFactory;

    }]);


console.log('appService.js');