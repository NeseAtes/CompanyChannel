app.controller('subjectController', function($scope,$window, $http,$routeParams,$localStorage) {
    $scope.deneme=function(perid){
        $scope.is_id=localStorage.getItem('is_id');
        //console.log("($scope.is_id",$scope.is_id);
        //console.log("perid",perid);
        if ($scope.is_id==perid) {
            return $scope.is_id
        }
    }
    $scope.checkdene=function(checkperid){
        $scope.is_id=localStorage.getItem('is_id');
        console.log("kontrol",$scope.is_id );
        console.log("kontrol2",checkperid );
        if ($scope.is_id==checkperid) {
            return $scope.is_id
        }
    }

    $scope.sub_id=$routeParams.subjectid;
    console.log("subjectid",$routeParams.subjectid);
    $http.get("http://localhost:3000/api/subject/one?subject_ID="+$scope.sub_id).then(function(response) {
        console.log("AAAAAAAresponse",response);
        $scope.subject=response.data.data;
        $scope.checkPer=response.data.data[0].personnel_ID;
        //console.log("$scope.checkPer",$scope.checkPer);
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


    $scope.deleteData=function(comid){
        $http.delete("http://localhost:3000/api/comment?comment_ID="+comid).then(function(response){
            console.log("commentresponse",response)
            $window.alert("Silindi");
            setTimeout(function(){
                $window.location.reload();
            });
           
        })
    }

    $scope.updateData=function(comid,comcomment){
        //console.log("$scope.namecom",comcomment);
        //console.log("comid",comid);
        var data={
            new_comment:comcomment,
            comment_ID:comid
        }

        $http.post("http://localhost:3000/api/comment/update?comment_ID=",JSON.stringify(data)).then(function(response){
            console.log("updateComment", response);
        })
    }

    $scope.checkshow=function(checkid){
        $http.post("http://localhost:3000/api/comment/answer",{comment_ID:checkid}).then(function(response){
            console.log("checkResponse",response);
            setTimeout(function(){
                    $window.location.reload();
            });
        })
    }
});