var app = angular.module('myApp',['ngRoute']);

angular.forEach(config,function(key,value) {
  app.constant(value,key);
});
app.config(function($routeProvider,$locationProvider){
  $locationProvider.hashPrefix('');
  $routeProvider.when('/login', {
    templateUrl: './pages/loginComponent/login.html',
    controller: 'loginController'
  });
});