var app = angular.module('myApp',['ngRoute', 'ngCookies', 'ngStorage']);

angular.forEach(config,function(key,value) {
  app.constant(value,key);
});
app.config(function($routeProvider,$locationProvider){
  $locationProvider.hashPrefix('');
  $routeProvider.when('/', {
    templateUrl: './pages/subjectListComponent/subject_list.html',
    controller: 'subject_listController'
  }).when('/login', {
    templateUrl: './pages/loginComponent/login.html',
    controller: 'loginController'
  }).when('/elastic/:searchid',{
  	templateUrl: './pages/elasticComponent/elastic.html',
  	controller: 'elasticController'
  });
});

app.controller('appController',function($scope, $http, SERVICE_URL,$window,$location){
	$scope.elasticsearch =function(){
	    setTimeout(function(){
			$window.location.reload();
		});
		//$localStorage.$reset();
		$location.path("/elastic/"+$scope.search);
    }
});