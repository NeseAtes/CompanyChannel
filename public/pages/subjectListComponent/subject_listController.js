app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/subject/:subjectid', {
      templateUrl: './pages/subjectComponent/subject.html',
      controller: 'subjectController'
    });
});

app.controller('subject_listController', function($scope, $http) {
	console.log("girdi")
    $http.get("http://localhost:3000/api/subject")
    .then(function(response) {
    	console.log("girdi")
        $scope.subjects=response.data.data;
    });
});