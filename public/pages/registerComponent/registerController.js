app.controller('registerController', function ($scope, $http, $location, $window, SERVICE_URL) {
    $scope.submitted=true;
    $scope.register = function (isValid) {
        var data = {
            name:$scope.name,
            email:$scope.email,
            password:$scope.password,
            role:$scope.role
        }
        if(isValid){
            $http.post("http://localhost:3000/api/personnels", JSON.stringify(data))
            .then(function (response) {
                if (response.data.data)
                    $window.location.reload();
            });
        }
        else{
            $window.alert("Boş alanları doldurun")
        }
    }
});