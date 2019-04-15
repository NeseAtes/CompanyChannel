var app = angular.module('myApp',['ngRoute']);

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
  });
});

app.controller('appController',function($scope, $http, SERVICE_URL){
	$scope.elasticsearch =function(){
		var data = {
            value : $scope.search
        };
        //console.log($scope.search);
        $http.post("http://localhost:3000/api/elastic", JSON.stringify(data))
        .then(function(resp){
            console.log("ES sonuc: ", resp.data.hits);
        //$scope.logs=[];
        $scope.users=[];
            if ($scope.search == undefined) {
                console.log("yazmadın??????????????????");
            }
            else{
            //$scope.logs=[];
            $scope.users=[];
                for (var i = 0; i < resp.data.hits.length; i++) {
               var a = resp.data.hits[i]._source;
               console.log(resp.data.hits[i]._source);
               //$scope.logs.push(a);
               $scope.users.push(a);
            }
            } 
        },function(err){
            console.log("ES err: ", err);
        });
	}
})