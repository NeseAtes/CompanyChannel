app.controller('subjectController', function($scope, $http) {
    $scope.addComment=function() {
        var data={
            comment:$scope.comment
        }
        $http.post("http://localhost:3000/api/comment",data).then(function(response) {
            console.log(response)
        });
    }
});