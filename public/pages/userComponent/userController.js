app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/subject/:subjectid', {
      templateUrl: './pages/subjectComponent/subject.html',
      controller: 'subjectController'
    });
});

app.controller('userController',function($scope,$http,$routeParams) {
	$scope.tab = 1;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab == tabNum;
    };


	$scope.personnel_id=$routeParams.userid;
	console.log("$scope.personnel_id",$scope.personnel_id)
	$http.get("http://localhost:3000/api/personnels?personnel_ID="+$scope.personnel_id)
    .then(function(response) {
      console.log("response3",response.data.data);
      $scope.users=response.data.data
    });

    console.log($scope.personnel_id)
    $http.get("http://localhost:3000/api/subject/personnel?personnel_ID="+$scope.personnel_id)
    .then(function(response) {
      console.log("response4",response);
      $scope.perSub=response.data.data
    });

    $http.get("http://localhost:3000/api/comment/personnel?personnel_ID="+$scope.personnel_id)
    .then(function(response) {
      console.log("response5",response);
      $scope.comSub=response.data.data
    });

})