app.controller('loginController', function($scope, $http,$location, $window, SERVICE_URL) {
    $scope.login=function () {
        var email=$scope.email;
        var password=$scope.password;
        $http.post("http://localhost:3000/login",{email:email,password:password})
        .then(function(response){
            console.log(response)
            setTimeout(function(){
                $window.location.reload();
            });
			if(response.data.is_user){
				$location.path("/");
			}
        });
    }
});