var app = angular.module('myApp',['ngRoute', 'ngCookies', 'ngStorage','ui.bootstrap','xeditable','ngFileUpload']);

angular.forEach(config,function(key,value) {
  app.constant(value,key);
});
app.config(function($routeProvider,$locationProvider){
  $locationProvider.hashPrefix('');
  $routeProvider.when('/subject_list', {
    templateUrl: './pages/subjectListComponent/subject_list.html',
    controller: 'subject_listController'
  }).when('/', {
    templateUrl: './pages/loginComponent/login.html',
    controller: 'loginController'
  }).when('/elastic/:searchid',{
  	templateUrl: './pages/elasticComponent/elastic.html',
  	controller: 'elasticController'
  }).when('/register',{
    templateUrl: './pages/registerComponent/register.html',
    controller: 'registerController'
  }).when('/personnel',{
    templateUrl: './pages/personnelComponent/personnel.html',
    controller: 'personnelController'
  }).when('/tag_list',{
    templateUrl: './pages/tag_listComponent/tag_list.html',
    controller: 'tag_listController'
  }).when('/user/:userid', {
      templateUrl: './pages/userComponent/user.html',
      controller: 'userController'
  });
});

app.controller('appController',function($scope,$localStorage,$window,$location,$http){
	$scope.elasticsearch =function(){
	    setTimeout(function(){
			$window.location.reload();
		});
		//$localStorage.$reset();
		$location.path("/elastic/"+$scope.search);
    }
    $scope.isAdmin=function(){
      $scope.is_admin=$localStorage.is_admin;
      return $scope.is_admin;
    }
    $http.get("http://localhost:3000/api/personnels?personnel_ID="+localStorage.getItem('is_id'))
    .then(function(response) {
      console.log("localStorage.getItem('is_id')",localStorage.getItem('is_id'))
      console.log("response8",response);
      $scope.online_user=response.data.data[0];
    });
});