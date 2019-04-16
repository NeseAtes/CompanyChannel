app.controller('subjectController', function($scope, $http,$routeParams) {
    $scope.sub_id=$routeParams.subjectid;
    console.log("subjectid",$routeParams.subjectid);
    $http.get("http://localhost:3000/api/subject/one?subject_ID="+$scope.sub_id).then(function(response) {
        console.log("response",response);
        $scope.subject=response.data.data;
    });
    $http.get("http://localhost:3000/api/comment?subject_ID="+$scope.sub_id).then(function(response) {
    	console.log("comResponse",response);
        $scope.comments=response.data.data;
    });

    $scope.addComment=function() {
        var data={
            comment:$scope.comment
        }
        $http.post("http://localhost:3000/api/comment",data).then(function(response) {
            console.log(response)//TODO devam et
        });
    }
});