
app.controller('userController',function($scope,$http,$routeParams) {
	$scope.personnel_id=$routeParams.userid;
	console.log("$scope.personnel_id",$scope.personnel_id)
	$http.get("http://localhost:3000/api/personnels?personnel_ID="+$scope.personnel_id)
    .then(function(response) {
      console.log("response3",response.data.data);
      $scope.users=response.data.data
    });

})