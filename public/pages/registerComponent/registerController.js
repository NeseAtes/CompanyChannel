app.controller('registerController', function ($scope, $http, $location, $window, SERVICE_URL) {
    $scope.register = function () {
        var data = {
            personnel_name:$scope.name,
            email:$scope.email,
            password:$scope.password,
            role:$scope.role
        }
       
        $http.post("http://localhost:3000/api/admin/personnels", JSON.stringify(data))
        .then(function (response) {
            if (response.data.data)
                $window.location.reload();
        });
    }
});