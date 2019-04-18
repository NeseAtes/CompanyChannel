app.controller('loginController', function($scope, $http, $cookies,$location, $window, SERVICE_URL,$localStorage) {
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

    $scope.login=function (isValid) {
        console.log(isValid)
        if(isValid){
            var email=$scope.email;
        var password=$scope.password;
        $http.post("http://localhost:3000/login",{email:email,password:password})
        .then(function(response){
            setTimeout(function(){
                $window.location.reload();
            });
            if(response.data.is_user==true){
                $localStorage.is_user=true;
                $location.path("/");

            }
<<<<<<< HEAD
=======
            else{
                $window.alert("Lütfen bilgileri kontrol edin.")
            }
>>>>>>> 1726168377359d2195f5d2658c0bf99d2ecbd967
            if(response.data.is_admin){
				$localStorage.is_admin=true;
            }
        });
        }else{
            $window.alert("Tüm alanları doldurun.")
        }
    }

    $scope.signout=function(){
        $http.get("http://localhost:3000/logout")
        .then(function(resp){
            console.log("çıkıtı")
            if(resp.data.message=='session closed'){
                setTimeout(function(){
                    $window.location.reload();
                });
                $localStorage.$reset();
                $location.path("/");
            }
        });
    }
    $scope.showBtn();

});