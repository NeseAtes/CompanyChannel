app.controller('subject_listController', function($scope, $http) {
    $http.get("http://localhost:3000/api/subject")
    .then(function(response) {
        $scope.subjects=response.data.data;
    });
    $scope.getComments=function(sub_id) {  
        $http.get("http://localhost:3000/api/comment?subject_ID="+sub_id)
        .then(function(response) {
            $scope.comments=response.data.data;
        });
    }
});