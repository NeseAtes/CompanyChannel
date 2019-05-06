app.controller('loginController', function ($scope, $http, $cookies, $location, $window, SERVICE_URL, $localStorage) {
    if (typeof ($cookies.get('auth')) == 'string') {
        $scope.show = true;
        $location.path("/subject_list");
    }
    $scope.showBtn = function () {
        if (typeof ($cookies.get('auth')) == 'string') {
            $scope.show = true;
        }
        else {
            $scope.show = false;
        }
    }

    $scope.login = function () {
        var email = $scope.email;
        var password = $scope.password;
        $http.post("http://localhost:3000/login", { email: email, password: password })
            .then(function (response) {
               setTimeout(function () {
                    $window.location.reload();
                }); 
                if (response.data.is_user == true) {
                    localStorage.setItem('is_id', response.data.is_id);
                    $localStorage.is_user = true;
                    $location.path("/subject_list");

                }
                else {
                    $window.alert("Lütfen bilgileri kontrol edin.")
                }
                if (response.data.is_admin) {
                    $localStorage.is_admin = true;
                }
            });

    }

    $scope.signout = function () {
        $http.get("http://localhost:3000/logout")
            .then(function (resp) {
                if (resp.data.message == 'session closed') {
                    setTimeout(function () {
                        $window.location.reload();
                    });
                    $localStorage.$reset();
                   
                    $location.path("/");
                }
            });
    }
    $scope.showBtn();

});