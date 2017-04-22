angular.module('shortUrl', [
  'app.routes',
  'mainCtrl',
  'loginCtrl',
  'signupCtrl',
  'authService',
  'appService',
  'redirectCtrl',
  'authCtrl'
]).config(['$httpProvider', ($httpProvider) => {
  $httpProvider.interceptors.push('AuthInterceptor');
}]);
