app.controller('loginController', function($scope, $http, $window, SERVICE_URL) {
	console.log("giriyor");
	$scope.showBtn=function(){
		console.log("cookie:" , $cookies.get('auth')); 
		if(typeof($cookies.get('auth'))=='string'){
			$scope.show= true;
		}
		else{
			$scope.show= false;
		}
		console.log($scope.show)
	}

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