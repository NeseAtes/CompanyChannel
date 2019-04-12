app.controller('subject_listController', function($scope, $http) {
    $http.get("http://localhost:3000/api/subject")
    .then(function(response) {
        $scope.subjects=response.data.data;
    });
});