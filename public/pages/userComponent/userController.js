
app.controller('userController',function($scope,$http) {
	$scope.personnel_id=$routeParams.userid;

	$http.get("http://localhost:3000/api/subject/tag?????")//yap
    .then(function(response) {
      console.log("response3",response.data.data);
    });
})