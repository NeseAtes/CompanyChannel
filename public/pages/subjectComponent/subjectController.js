app.controller('subjectController', function($scope,$window, $http,$routeParams) {
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

    $scope.addComment=function(subid) {
        var data={
            comment:$scope.comment,
            subject_ID:subid
        }
        $http.post("http://localhost:3000/api/comment",JSON.stringify(data)).then(function(response) {
            if(response.data.data)
                $window.location.reload();
        });
    }
});