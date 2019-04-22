
app.controller('userController',function($scope,$http,$routeParams) {
	$scope.personnel_id=$routeParams.userid;

	$http.get("http://localhost:3000/api/fjdhfjdgg?id")
    .then(function(response) {
      console.log("response3",response.data.data);
    });
})