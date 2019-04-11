app.controller('loginController', function($scope, $http,$window) {
    $scope.login=function (email,password) {
        $http.post("http://localhost:3000/login",{email:email,password:password})
        .then(function(response){
            $window.location.reload();

			if(resp.data.is_user){
				$location.path("/");
			}
        });
    }
});