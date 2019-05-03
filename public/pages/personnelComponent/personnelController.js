app.config(function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/user/:userid', {
      templateUrl: './pages/userComponent/user.html',
      controller: 'userController'
    });
});

app.controller('personnelController',function($scope,$http,$localStorage) {
  $scope.users=function(){
      $scope.is_user= $localStorage.is_user;
      return $scope.is_user;
    }

	$http.get("http://localhost:3000/api/personnels")
    .then(function(response) {
      console.log("response2",response);
      $scope.personnels=response.data.data
    });
})