app.controller('tagController', function($scope, $http, $localStorage,$routeParams) {
	$scope.tag=$routeParams.tag;
	console.log("$scope.tag",$scope.tag);
    $http.get("http://localhost:3000/api/subject/tag?tag="+$routeParams.tag)
    .then(function(response) {
      console.log("response2",response);
      $scope.tags=response.data.data
      console.log("$scope.tags",$scope.tags);
    });
});