app.controller('registerController', function($scope, $http,$location, $window, SERVICE_URL) {
    $scope.register=function () {
        var name=$scope.name;
        var email=$scope.email;
        var password=$scope.password;
        var role=$scope.role;
        $http.post("http://localhost:3000/personnels",{name:name,email:email,password:password,role:role})
        .then(function(response){
            if(response.data){
                $window.alert("OK");
            }
        });
    }
});